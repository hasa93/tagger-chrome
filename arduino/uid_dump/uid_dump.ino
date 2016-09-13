#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN   48
#define SS_PIN    53

MFRC522 reader(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;

bool writeMode = true;

const byte bufferUid[] = {0x53, 0x91, 0x8F, 0x01};

byte classicBuffer[3][16];
byte ulBuffer[3][16];

byte classicBlock, classicPtr;
byte ulBlock, ulPtr;

byte ulCount = 0;
byte classicCount = 0;

MFRC522::StatusCode status;

void setup() {   
   SPI.begin();
   reader.PCD_Init();

   for(byte i=0; i < 6; i++){
     key.keyByte[i] = 0xFF;
   }

   Serial.begin(115200);   
   //Serial.println(F("Standing by for PICCs"));

   initializeBuffers();
}

void loop() {
    if(reader.PICC_IsNewCardPresent() && reader.PICC_ReadCardSerial()){

      if(isBuffer(reader.uid.uidByte, reader.uid.size)){

        if(writeMode && (ulCount > 0 || classicCount > 0)){
          //Serial.println("Writing to Buffer");
          
          for(byte i = 0; i < 3; i++){
            status = (MFRC522::StatusCode) reader.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, i + 4, &key, &(reader.uid));
        
            if(status != MFRC522::STATUS_OK){
               Serial.print("!"); 
               break;
            }
            status = (MFRC522::StatusCode) reader.MIFARE_Write(i + 4, classicBuffer[i], 16);
            if(status != MFRC522::STATUS_OK) break;

            status = (MFRC522::StatusCode) reader.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, i + 8, &key, &(reader.uid));
        
            if(status != MFRC522::STATUS_OK){
               Serial.print("!"); 
               break;
            }
            
            status = (MFRC522::StatusCode) reader.MIFARE_Write(i + 8, ulBuffer[i], 16);
            if(status != MFRC522::STATUS_OK) break;
          }

          writeMode = false;          

          Serial.print("w");
          //reader.PICC_DumpMifareClassicSectorToSerial(&(reader.uid), &key, 1);
          //reader.PICC_DumpMifareClassicSectorToSerial(&(reader.uid), &key, 2);                  
        }
        else if(!writeMode){
          readFromBuffer();

          if(ulCount == 0 && classicCount == 0){
            initializeBuffers();
            writeMode = true;
          }
        }
        
        reader.PICC_HaltA();
        reader.PCD_StopCrypto1();        
        return;
      }
     
      Serial.print(F("n"));
      
      if(reader.uid.size == 4){
        classicCount++;
        writeToClassicBuffer(reader.uid.uidByte);
      }
      
      if(reader.uid.size == 7){
        ulCount++;
        writeToUlBuffer(reader.uid.uidByte);
      }
      
      reader.PICC_HaltA(); 
    }   
    
}

void dump_byte_array(byte *arr, byte size, byte start){
  for(byte i = start; i < size; i++){
    Serial.print(arr[i] < 0x10 ? "0" : "");
    Serial.print(arr[i], HEX);  
  }
}

bool isBuffer(byte *uid, byte size){
  for(byte i = 0; i < size; i++){
    if(uid[i] != bufferUid[i]){
      return false;
    }
  }
  return true;
}

void initializeBuffers(){
  for(byte i = 0; i < 3; i++){
    for(byte j = 0; j < 16; j++){
      classicBuffer[i][j] = 0x00;
      ulBuffer[i][j] = 0x00;
    }
  }

  ulBlock = ulPtr = 0;
  classicBlock = classicPtr = 0;
}

void writeToClassicBuffer(byte *uid){
   
  if(classicPtr == 15){
    classicPtr = 0;
    classicBlock++;
  }

  for(byte i = 0; i < 4; i++){
    classicBuffer[classicBlock][classicPtr] = uid[i];
    classicPtr++;  
  }
  
  return;
}

void writeToUlBuffer(byte* uid){
  
  if(ulPtr > 13){
    ulPtr = 0;
    ulBlock++;
  }

  for(byte i = 0; i < 7; i++){
    ulBuffer[ulBlock][ulPtr] = uid[i];
    ulPtr++;  
  }

  return;
}

void readFromBuffer(){
  Serial.print("r");
  
  MFRC522::StatusCode status;
  
  for(byte i = 0; i < 3; i++){
    byte buffer[18];    
    byte size = sizeof(buffer);

    status = (MFRC522::StatusCode) reader.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, i + 8, &key, &(reader.uid));

    if(status != MFRC522::STATUS_OK){
      Serial.println("!");
      return;
    }
    
    status = (MFRC522::StatusCode) reader.MIFARE_Read(i + 8, buffer, &size);

    if(status == MFRC522::STATUS_OK && ulCount > 0){
      for(byte j = 0; j < 8 && ulCount > 0; j+=7){
        Serial.print("*");
        dump_byte_array(buffer, 7 + j, j);
        ulCount -= 1;
      }
    }
    
    status = (MFRC522::StatusCode) reader.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, i + 4, &key, &(reader.uid));

    if(status != MFRC522::STATUS_OK){
      Serial.print("!");
      return;
    }
    
    status = (MFRC522::StatusCode) reader.MIFARE_Read(i + 4, buffer, &size);

    if(status == MFRC522::STATUS_OK){
      for(byte j = 0; j < 16 && classicCount > 0; j+=4){
        Serial.print("*");
        dump_byte_array(buffer, 4 + j, j);;
        classicCount -= 1;
      }
    }
  }

  Serial.print("s");
  return;
}




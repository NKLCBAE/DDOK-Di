#include <Wire.h>

#define LED_PIN 13
#define PSD_ANALOG A0

int16_t ax, ay, az, psd;

char str[10] = {0};
int idx = 0;
int time = 0;
int cur = 0;
int curD;
int beD = -1;
int num;
bool ds=false;

int getValue(int value)
{
  if (value < 10) value = 10;
  return ((67870.0 / (value - 3.0)) - 40.0);
}

class Motor {
  private:
  uint8_t pin_FWD, pin_REV, pin_PWM;

  public:
  Motor(uint8_t pinFWD, uint8_t pinREV, uint8_t pinPWM){
    pin_FWD = pinFWD;
    pin_REV = pinREV;
    pin_PWM = pinPWM;
    pinMode(pin_FWD, OUTPUT);
    pinMode(pin_REV, OUTPUT);
    pinMode(pin_PWM, OUTPUT);
  }

  void checkConstruct() {
    Serial.print(pin_FWD);
    Serial.print(" ");
    Serial.print(pin_REV);
    Serial.print(" ");
    Serial.println(pin_PWM);
  }

  void setPWM(uint8_t pwm) {
    analogWrite(pin_PWM, pwm);
  }

  void setDIR(bool dir) {
    if (dir) {
      digitalWrite(pin_FWD, HIGH);
      digitalWrite(pin_REV, LOW);
    }
    else {
      digitalWrite(pin_FWD, LOW);
      digitalWrite(pin_REV, HIGH);
    }
  }

  void setMotor(int16_t ctrlPWM) {
    if (ctrlPWM < 0){
      setDIR(false);
      setPWM((uint8_t) (-ctrlPWM));
    }
    else {
      setDIR(true);
      setPWM((uint8_t)ctrlPWM);
    }
  }
};

Motor left(9, 8, 5);
Motor right(10, 11, 6);
Motor Monitor(12, 13, 7);

void setup()
{
  Wire.begin();
  Serial.begin(115200);
  
  /*
  Serial.println("Initialize I2C ADXL345 devices");
  accel.initialize();
  Serial.println("Testing device Connections");
  Serial.println(accel.testConnection() ? "Successful" : "Failed");
  /**/
}

void loop()
{
  /*
  accel.getAcceleration(&ax, &ay, &az);
  Serial.print(ax); Serial.print("\t");
  /**/
  int value = analogRead(A0);
  int distance;
  curD = getValue(value);
  if(beD == -1){
    beD = curD;
  }
  if(abs(curD-beD) < 3) distance = beD * 0.2 + curD * 0.8;
  beD = curD;
    if(Serial.available() == 0){
        time = millis();
    }
    if(Serial.available() > 0){
        if(millis() - time > 100){
            while(1){
                char ch = Serial.read();
                if (ch == '\n')break;
                str[idx++] = ch;
            }
            if(!strcmp(str,"U")){
                cur = 1;
            }
            if(!strcmp(str,"D")){
                cur = -1;
            }
            if(!strcmp(str,"S")){
                cur = 0;
            }
            if(!strcmp(str, "MU")){
              Monitor.setMotor(250);
              delay(2500);
              Monitor.setMotor(0);
            }
            if(!strcmp(str, "MD")){
              Monitor.setMotor(-250);
              delay(2500);
              Monitor.setMotor(0);
            }
            num = 0;
            if(str[0] == 'D' && str[1] == 'S'){
              ds = true;
              for(int i=2;i<idx;i++){
                num = num*10 + str[i]-'0';
              }
            }
        }
    }
    
    if(ds == true){
      if(num > distance){
        cur = 1;
      }
      else if(num < distance){
        cur = -1;
      }
      else{
        ds = false;
        cur = 0;
      }
    }
    
    for(int i=0;i<10;i++){
        str[i] = 0;
    }
    idx = 0;

    if(cur == 1){
      left.setMotor(-250);
      right.setMotor(-250);
      Serial.println(distance);
    }
    else if(cur == -1){
      left.setMotor(250);
      right.setMotor(250);
      Serial.println(distance);
    }
    else{
      left.setMotor(0);
      right.setMotor(0);
    }

    delay(200);
}

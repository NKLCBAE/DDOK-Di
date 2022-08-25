#ifdef RaspberryPi

#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <unistd.h>

//wiring Pi
#include <wiringPi.h>
#include <wiringSerial.h>

char device[] = "/dev/ttyACM0";

int fd;
unsigned long baud = 115200;
unsigned long time = 0;

void setup()
{
	printf("%s\n", "Raspberry Startup!");
	fflush(stdout);

	if((fd = serialOpen(device, baud)) < 0){
		fprintf(stderr,"Unable to open serial device: %s\n", strerror(errno));
		exit(1);
	}

	if(wiringPiSetup() == -1){
		fprintf(stdout, "Unable to start wiringPi: %s\n", strerror(errno));
		exit(1);
	}

}

void loop()
{
	char str[10] = {0};
	int len = 0;
	scanf("%s", str);
	for(int i=0;i<10;i++){
		if(str[i] == 0){
			len = i;
			break;
		}
	}
	str[len] = '\n';
    serialPuts (fd, str);
	sleep(1);
    // you can also write data from 0-255
    // 65 is in ASCII 'A'
 
  // read signal
  if(serialDataAvail (fd)){
    char newChar = serialGetchar (fd);
    printf("%c", newChar);
    fflush(stdout);
  }
}

// main function for normal c++ programs on Raspberry
int main(){
  setup();
  while(1) loop();
  return 0;
}

#endif

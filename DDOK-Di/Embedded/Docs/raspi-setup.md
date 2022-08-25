## First Setup

### Hello Raspberry Pi!
- [Raspberry Pi Imager](https://www.raspberrypi.com/software/)를 이용해 micro SD 카드에 Raspbian 이미지를 구워줍니다.
- microSD 카드를 Raspberry Pi에 삽입하고 전원을 연결한 뒤 기다립니다.

### Procedure
- apt 저장소와 설치된 패키지들을 최신화 합니다.
	- (1) apt 저장소 및 패키지 최신화
      ```bash
      sudo apt-get update
      sudo apt-get upgrade
      ```

- 각종 통신들을 사용할 수 있도록 설정을 변경해줍니다.

 	- (1) Terminal에서 raspi-config 실행
        ```bash
        sudo raspi-config
        ```

 	- (2) 3. Interface Options → I2 SSH, I3 VNC, I4 SPI → < Yes > → Enter 입력

- 사용할 스크린을 연결한 뒤 Raspberry Pi의 해상도를 조정해줍니다.

  - (1) Menu → Preferences → Screen Configuration

  - (2) Configure → Screens → (사용중인 Screen) → 1280x720

  - (3) config.txt 수정 (부팅 시 HDMI 해상도 강제)
	
	파일 경로 '/boot/config.txt' 에서 필요한 해상도 모드를 지정한 뒤 주석표시 '#'을 해제합니다

	```
	# uncomment to force a specific HDMI mode (this will force VGA)
	hdmi_group=2
	hdmi_mode=85
	```

- VNC로도 같은 스크린을 해상도로 볼 수있도록 VNC 해상도를 변경합니다.

  - (1) Terminal에서 raspi-config 실행
  	```bash
	sudo raspi-config
	```
  
  - (2) 2. Display Options → D5 VNC Resolution → 1280x720

### Resolving Errors
1. 기기의 시간이 알맞지 않아 보안 repository에서의 apt-get update가 거부되는 경우
  
	- 시간을 강제로 설정해줍니다.
  		```bash
		sudo date -s "2022-07-17 15:40:00"
  		```
		- "2022-07-17 15:40:00" 부분을 현재 시간으로 바꾸어 설정
	
		<br>electron-rebuild 등의 과정에서도 발생하는 경우가 있습니다. 자세한 내용은 [해당 설정 문서](../Electron_React/Electron_React.md)를 참고하십시오.

2. 스크린이 잘 뜨지 않는 경우
  
	- 스크린을 연결하고 라즈베리파이를 완전히 종료한 뒤 다시 부팅합니다.

  
---
## Install Node.js on Raspberry Pi

### (1) NodeSource를 통한 설치 - 권장
  데비안/우분투 기반(apt)이나 엔터프라이즈 리눅스 기반의 배포판(rpm)에 대해서 공식 Node.js 바이너리 배포판은 [NodeSource](https://github.com/nodesource/distributions/blob/master/README.md#deb)가 제공합니다.

  NodeSource는 통해서 apt 저장소를 이용한 설치가 가능하도록 url을 제공합니다.

#### Procedure
- 환경 설정 끌어오기 / 설치

	```bash
	curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
	sudo apt-get install -y nodejs
	```

- 설치 확인
    ```bash
  	node --version
	npm --version
	```

### (2) Binary 이미지를 이용한 설치
  Raspbian은 Debian 기반 Arm Linux의 배포판이므로 이에 맞도록 컴파일 된 Node.js 의 Binary 이미지를 Binary 폴더인 "/usr/bin" 에서 찾을 수 있도록 합니다.
  
  binary 파일은 node.js와 npm을 모두 포함합니다.
  

#### Procedure
- 설치된 Raspbian 버전(32bit/64bit) 에 맞는 arm linux용 binary 이미지를 다운로드 합니다.
  
  ```bash
  # 64 bit
  wget https://nodejs.org/dist/v16.16.0/node-v16.16.0-linux-arm64.tar.xz
  # 32 bit
  wget https://nodejs.org/dist/v16.16.0/node-v16.16.0-linux-armv7l.tar.xz
  ```

- 다운로드 받은 binary 이미지를 압축해제 합니다.
  
  	64비트 Raspbian을 기준으로 설명합니다.
  
	```bash
	sudo tar xvf node-v16.16.0-linux-arm64.tar.xz -C /opt
	```
  
- 압축을 해제한 바이너리 이미지를 Node를 관리할 폴더로 이동시킵니다.
	```bash
    cd /opt
    sudo mv -v node-v16.16.0-linux-arm64/ node
	```

- node와 npm 바이너리가 포함된 폴더들을 /usr/bin에서 찾을 수 있도록 symbolic link를 설정합니다.
    ```bash
  	sudo ln -s /opt/node/bin/node /usr/bin/node
	sudo ln -s /opt/node/bin/npm /usr/bin/npm
	```

- Raspberry Pi를 재부팅합니다.
    ```bash
  	sudo reboot
	```

- 설치 확인
    ```bash
  	node --version
	npm --version
	```

---
## Shortcut
```bash
sudu apt-get update && sudo apt-get upgrade -y
sudo apt-get install vim curl
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v && npm -v
sudo raspi-config
```
CREATE TABLE `user` (
	`id`	int	NOT NULL	COMMENT 'AUTO INCREMENT',
	`account_id`	varchar(20)	NOT NULL,
	`password`	varchar(200)	NOT NULL,
	`name`	varchar(20)	NOT NULL,
	`height`	int	NULL,
	`email`	varchar(50)	NULL,
	`phone_number`	varchar(50)	NULL,
	`profile_URL`	varchar(200)	NULL,
	`position`	varchar(20)	NULL,
	`employee_number`	varchar(20)	NULL,
	`seat_id`	int	NULL,
	`staus_id`	int	NOT NULL,
	`notice_display`	boolean	NULL	DEFAULT true,
	`notice_sound`	boolean	NULL	DEFAULT true,
	`notice_vibration`	boolean	NULL	DEFAULT true
);

CREATE TABLE `seat` (
	`id`	int	NOT NULL	COMMENT 'AUTO INCREMENT',
	`is_empty`	boolean	NOT NULL	DEFAULT ture,
	`seat_number`	int	NOT NULL,
	`area`	varchar(10)	NOT NULL	DEFAULT "A"
);

CREATE TABLE `user_status` (
	`id`	int	NOT NULL	COMMENT 'AUTO INCREMENT',
	`status`	varchar(20)	NOT NULL
);

CREATE TABLE `desk_setting` (
	`Key`	VARCHAR(255)	NOT NULL,
	`desk_height`	Not Null	NULL,
	`chair_height`	Not Null	NULL
);

CREATE TABLE `user_desk_setting` (
	`user_id`	int	NOT NULL,
	`desk_setting_id`	int	NOT NULL,
	`setting_number`	int	NOT NULL	DEFAULT (유저당 세팅 최대 3개)
);

CREATE TABLE `todo` (
	`id`	int	NOT NULL	COMMENT 'AUTO INCREMENT',
	`user_id`	int	NOT NULL,
	`start_time`	DATETIME	NOT NULL	DEFAULT CURRENT_TIME(),
	`end_time`	DATETIME	NOT NULL	DEFAULT CURRENT_TIME() +1h,
	`content`	varchar(200)	NULL,
	`priority_id`	int	NOT NULL,
	`category_id`	int	NOT NULL	COMMENT '디폴트는 "메인 일정"',
	`time_to_notice`	DATETIME	NULL
);

CREATE TABLE `priority` (
	`id`	int	NOT NULL	COMMENT 'AUTO INCREMENT',
	`priority`	varchar(20)	NOT NULL	COMMENT '중요도를 등록'
);

CREATE TABLE `category` (
	`id`	int	NOT NULL	COMMENT 'AUTO INCREMENT',
	`category`	varchar(20)	NOT NULL	COMMENT '카테고리는 유저가 추가 가능'
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`id`
);

ALTER TABLE `seat` ADD CONSTRAINT `PK_SEAT` PRIMARY KEY (
	`id`
);

ALTER TABLE `user_status` ADD CONSTRAINT `PK_USER_STATUS` PRIMARY KEY (
	`id`
);

ALTER TABLE `desk_setting` ADD CONSTRAINT `PK_DESK_SETTING` PRIMARY KEY (
	`Key`
);

ALTER TABLE `todo` ADD CONSTRAINT `PK_TODO` PRIMARY KEY (
	`id`
);

ALTER TABLE `priority` ADD CONSTRAINT `PK_PRIORITY` PRIMARY KEY (
	`id`
);

ALTER TABLE `category` ADD CONSTRAINT `PK_CATEGORY` PRIMARY KEY (
	`id`
);


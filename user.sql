
use project;

DROP TABLE IF EXISTS `User`;

CREATE TABLE
    `User` (
        `ID` VARCHAR(10) NOT NULL COMMENT '유저ID',
        `pw` VARCHAR(20) NOT NULL COMMENT '유저 pw',
        `tel` CHAR(15) NOT NULL COMMENT '전화번호',
        `email` varchar(40) NOT NULL COMMENT '이메일',
        `reservated_list` VARCHAR(100) COMMENT '예약한 공연의 ID리스트',
        `mac_adrress` VARCHAR(20) COMMENT '인증기기를 위한 맥주소',
        `rank` int(10) COMMENT '등급',
        PRIMARY KEY (`ID`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

LOCK TABLES `User` WRITE;

INSERT INTO
    `User` (
        `ID`,
        `pw`,
        `tel`,
        `email`,
        `rank`
    )
VALUES (
        'abcde',
        'fghi',
        '010-1111-1111',
        'abc@naver.com',
        1
    ), (
        'ticket',
        'ticket',
        '010-2222-2222',
        'def@naver.com',
        1
    ), (
        'LOL',
        'LCK',
        '010-3333-3333',
        'LOL@naver.com',
        1
    ), (
        'login',
        'pass',
        '010-4444-4444',
        'word@naver.com',
        1
    ), (
        'html',
        'css',
        '010-5555-5555',
        'htcss@naver.com',
        1
    ), (
        'java',
        'mysql',
        '010-6666-6666',
        'jasql@naver.com',
        1
    );

UNLOCK TABLES;
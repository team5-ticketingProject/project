use show_data;

DROP TABLE IF EXISTS `User`;

CREATE TABLE
    `User` (
        `ID` VARCHAR(10) NOT NULL COMMENT '유저ID',
        `pw` VARCHAR(20) NOT NULL COMMENT '유저 pw',
        `tel` CHAR(15) NOT NULL COMMENT '전화번호',
        `email` varchar(40) NOT NULL COMMENT '이메일',
        `reservcount` int(10) COMMENT '예매횟수',
        `mac_adrress` VARCHAR(20) COMMENT '인증기기를 위한 맥주소',
        `rank` int(10) COMMENT '등급',
        PRIMARY KEY (`ID`)
    ) ENGINE = InnoDB;

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
        0
    );

UNLOCK TABLES;

select ID,pw,rank from User where ID ='java' and pw ='mysql';

select count(*) as 'cnt' from User where ID ='java' and pw ='mysql';

INSERT INTO
    User (ID, pw, tel, email, rank)
VALUES (
        'asd',
        'asd',
        'asd',
        'asd',
        'asd'
    );
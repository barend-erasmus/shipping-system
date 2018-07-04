CREATE TABLE ORDERS (
   ID                       CHAR(36)    NOT NULL,
   ACCOUNT_NUMBER           CHAR(64)    NOT NULL,
   ACCOUNT_EMAIL_ADDRESS    CHAR(255)   NOT NULL,
   ACCOUNT_NAME             CHAR(255)   NOT NULL,
   APPROVED                 BOOLEAN     NOT NULL,
   CANCELLED                BOOLEAN     NOT NULL,
   COLLECTION_TIMESTAMP     INT         NULL,
   CONFIRMED                BOOLEAN     NOT NULL,
   COST                     DOUBLE      NULL,
   DECLINED                 BOOLEAN     NOT NULL,
   DELIVERY_TIMESTAMP       INT         NULL,
   DESTINATION_ID           INT         NOT NULL,
   HEIGHT                   DOUBLE      NOT NULL,
   LENGTH                   DOUBLE      NOT NULL,
   WIDTH                    DOUBLE      NOT NULL,
   SOURCE_ID                INT         NOT NULL,
   WEIGHT                   DOUBLE      NOT NULL
);

CREATE TABLE AGENTS (
   ID                       CHAR(36)    NOT NULL,
   EMAIL_ADDRESS            CHAR(255)   NOT NULL,
   NAME                     CHAR(255)   NOT NULL
);

INSERT INTO AGENTS (ID, EMAIL_ADDRESS, NAME) VALUES ('461a3f63-2362-48b9-9522-25b241bd64a7', 'developersworkspace@gmail.com', 'Barend Erasmus');

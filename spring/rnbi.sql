/*
 Navicat Premium Data Transfer

 Source Server         : xiye
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : localhost:3306
 Source Schema         : rnbi

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 17/12/2023 19:39:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for channel
-- ----------------------------
DROP TABLE IF EXISTS `channel`;
CREATE TABLE `channel`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createTime` datetime NULL DEFAULT NULL,
  `updateTime` datetime NULL DEFAULT NULL,
  `deleted` int NULL DEFAULT NULL,
  `version` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of channel
-- ----------------------------
INSERT INTO `channel` VALUES ('test1', 'test1', 'usisjanz', '2023-12-16 19:02:32', '2023-12-16 19:02:34', 0, 1);
INSERT INTO `channel` VALUES ('test2', 'test2', 'usisjanz', '2023-12-17 09:10:55', '2023-12-17 09:10:57', 0, 1);

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `channelId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `reply` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createTime` datetime NULL DEFAULT NULL,
  `updateTime` datetime NULL DEFAULT NULL,
  `deleted` int NULL DEFAULT NULL,
  `version` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('1', 'test1', '你好', '你好', '2023-12-16 20:10:43', '2023-12-16 20:10:44', 0, 1);
INSERT INTO `message` VALUES ('2', 'test1', '你叫什么名字？', '我的名字是Orange，是你的AI办公助理，你有任何问题都可以询问我，我会给予你帮助。', '2023-12-16 20:11:26', '2023-12-16 20:11:29', 0, 1);
INSERT INTO `message` VALUES ('3', 'test1', '这是一条测试数据，你可以不用回复我。', '好的，我将不会回复你的这一条测试数据。', '2023-12-16 20:12:05', '2023-12-16 20:12:07', 0, 1);
INSERT INTO `message` VALUES ('4', 'test1', '如何看待中东局势？', '这是一条敏感问题，对不起我不能给你答案。', '2023-12-16 20:12:40', '2023-12-16 20:12:42', 0, 1);
INSERT INTO `message` VALUES ('5', 'test1', '为什么不能给我答案？', '我只能说懂得都懂，不懂的我说了也不懂，这个问题只能意会不能言传，懂得自然懂，不懂得点了也不懂，涉及到很深，水很深，你把握不住，听懂掌声。', '2023-12-16 20:13:48', '2023-12-16 20:13:50', 0, 1);
INSERT INTO `message` VALUES ('6', 'test2', 'Hello!', '你好！', '2023-12-17 09:11:21', '2023-12-17 09:11:24', 0, 1);

-- ----------------------------
-- Table structure for setting
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `language` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `mode` int NULL DEFAULT NULL,
  `createTime` datetime NULL DEFAULT NULL,
  `updateTime` datetime NULL DEFAULT NULL,
  `deleted` int NULL DEFAULT NULL,
  `version` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of setting
-- ----------------------------
INSERT INTO `setting` VALUES ('1d1205e0cff9928f34ae830005503bf7', NULL, 0, '2023-12-07 15:42:20', '2023-12-07 15:42:20', 0, 1);
INSERT INTO `setting` VALUES ('sjsjkal', 'zh', 0, '2023-12-05 13:50:18', '2023-12-05 13:50:20', 0, 0);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createTime` datetime NULL DEFAULT NULL,
  `updateTime` datetime NULL DEFAULT NULL,
  `deleted` int NULL DEFAULT NULL,
  `version` int NULL DEFAULT NULL,
  `occupation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('e63641f4084c6c5a07f4b56337f5dbe3', NULL, '231', NULL, '11', NULL, '2023-12-07 15:42:20', '2023-12-07 15:42:20', 0, 1, NULL, NULL, NULL);
INSERT INTO `user` VALUES ('usisjanz', 'xiye', '123456', NULL, '123@163.com', NULL, '2023-12-05 12:38:43', '2023-12-05 12:38:46', 0, 0, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for user_setting
-- ----------------------------
DROP TABLE IF EXISTS `user_setting`;
CREATE TABLE `user_setting`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `settingId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_setting
-- ----------------------------
INSERT INTO `user_setting` VALUES ('2aj', 'usisjanz', 'sjsjkal');
INSERT INTO `user_setting` VALUES ('eae4e4b96d29d74eeecde848a0a33041', 'e63641f4084c6c5a07f4b56337f5dbe3', '1d1205e0cff9928f34ae830005503bf7');

SET FOREIGN_KEY_CHECKS = 1;

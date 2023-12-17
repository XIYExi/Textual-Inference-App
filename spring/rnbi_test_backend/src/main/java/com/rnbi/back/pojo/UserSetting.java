package com.rnbi.back.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("user_setting")
public class UserSetting {

    @TableId(value = "id", type= IdType.UUID)
    private String id;

    @TableField(value = "userId")
    private String userId;

    @TableField(value = "settingId")
    private String settingId;

}

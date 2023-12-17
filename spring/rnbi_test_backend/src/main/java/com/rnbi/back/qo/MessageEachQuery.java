package com.rnbi.back.qo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageEachQuery {

    private String channelId;

    private Integer page;

}

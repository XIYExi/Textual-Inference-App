package com.rnbi.back.qo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class WebsocketReplay {

    private String content;

    private Integer type;

}

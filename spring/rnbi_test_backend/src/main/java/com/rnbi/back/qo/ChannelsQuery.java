package com.rnbi.back.qo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChannelsQuery {

    private String userId;

    private String searchQuery;
}

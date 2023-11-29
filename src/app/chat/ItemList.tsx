import React, {useCallback, useEffect, useRef, useState} from "react";
import {Flex, Text, View} from "@ant-design/react-native";
import {Image, LayoutAnimation, StyleSheet, TouchableOpacity} from "react-native";
import {IUploadItem} from "../../mobx/chatStore";
import SwipeableItem, { useSwipeableItemParams } from "react-native-swipeable-item";
import DraggableFlatList, {
    RenderItemParams,
    ScaleDecorator,
} from "react-native-draggable-flatlist";
import Animated, { useAnimatedStyle } from "react-native-reanimated";


const OVERSWIPE_DIST = 20;
const NUM_ITEMS = 20;

interface IItemList {
    uploadList: IUploadItem[];
    removeUploadList: (id:string) => {};
}


type Item = {
    key: string;
    title: string;
};



const ItemList = (props: IItemList) => {

    const {uploadList, removeUploadList} = props;
    const itemRefs = useRef(new Map());
    const [data, setData] = useState<Item[]>([]);

    useEffect(() => {
        // 更新数据
        const _data = uploadList.map((item,index) => {
            return{
                key: index.toString(),
                ...item,
            } as Item;
        })
        setData(_data);
    }, [uploadList])



    const renderItem = useCallback((params: RenderItemParams<Item>) => {
        const onPressDelete = () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
            setData(prev => {
                return prev.filter(item => item !== params.item)
            })
        }

        return <RowItem {...params} itemRefs={itemRefs} onPressDelete={onPressDelete} />;
    }, [])



    return(
        <View style={styles.container}>
            <DraggableFlatList
                keyExtractor={(item) => item.key}
                data={data}
                renderItem={renderItem}
                onDragEnd={({ data }) => setData(data)}
                activationDistance={20}
            />
        </View>
    )
}


// 每一行 子项
type RowItemProps = {
    item: Item;
    drag: () => void;
    onPressDelete: () => void;
    itemRefs: React.MutableRefObject<Map<any, any>>;
};

function RowItem({ item, itemRefs, drag, onPressDelete }: RowItemProps) {
    const [snapPointsLeft, setSnapPointsLeft] = useState([150]);

    return (
        <ScaleDecorator>
            <SwipeableItem
                key={item.key}
                item={item}
                ref={(ref) => {
                    if (ref && !itemRefs.current.get(item.key)) {
                        itemRefs.current.set(item.key, ref);
                    }
                }}
                onChange={({ open }: any) => {
                    if (open) {
                        // Close all other open items
                        [...itemRefs.current.entries()].forEach(([key, ref]) => {
                            if (key !== item.key && ref) ref.close();
                        });
                    }
                }}
                overSwipe={OVERSWIPE_DIST}
                renderUnderlayLeft={() => <UnderlayLeft drag={drag} onPressDelete={onPressDelete} />}
                snapPointsLeft={snapPointsLeft}>
                <TouchableOpacity
                    activeOpacity={1}
                    onLongPress={drag}
                    style={[
                        styles.row,
                        {height: '100%'},
                    ]}>
                   {/* <Text style={styles.text}>{`${item.title}`}</Text>*/}

                    <View>
                        {/*文件预览部分*/}
                        <View style={[styles.uploadFileWrapper, {}]}>
                            <View style={{width: '100%', zIndex: 100}}>
                                <Flex align='center' justify='start'>
                                    <Image
                                        source={require('../../assets/chat/file.png')}
                                        style={{width: 24, height: 24}}
                                    />
                                    <Text style={styles.uploadFileTitle}>{item.title}</Text>
                                </Flex>
                            </View>

                            <Image
                                source={require('../../assets/chat/rightArrow.png')}
                                style={{
                                    width: 18,
                                    height: 18,
                                    opacity: 0.8,
                                    position: 'absolute',
                                    top: 18,
                                    right: 12,
                                }}
                            />
                        </View>

                        {/*隐藏层*/}
                        <View style={styles.uploadFileAfter}>
                            del
                        </View>
                    </View>
                </TouchableOpacity>
            </SwipeableItem>
        </ScaleDecorator>
    );
}

const UnderlayLeft = ({ drag, onPressDelete }: { drag: () => void, onPressDelete: () => void }) => {
    const { item, percentOpen } = useSwipeableItemParams<Item>();
    const animStyle = useAnimatedStyle(
        () => ({
            opacity: percentOpen.value,
        }),
        [percentOpen]
    );

    return (
        <Animated.View
            style={[styles.row, styles.underlayLeft, animStyle]} // Fade in on open
        >
            <TouchableOpacity onPress={onPressDelete}>
                <Text style={styles.text}>{`[delete]`}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    uploadFileWrapper: {
        padding: 12,
        width: '100%',
        borderRadius: 16,
        zIndex: 10,
        position: 'relative',
    },
    uploadFileTitle: {

    },
    uploadFileAfter: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 50,
        height: '100%',
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        backgroundColor: '#F75555',
        zIndex: -10,
    },
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 32,
    },
    underlayRight: {
        flex: 1,
        backgroundColor: 'teal',
        justifyContent: 'flex-start',
    },
    underlayLeft: {
        flex: 1,
        backgroundColor: 'tomato',
        justifyContent: 'flex-end',
    },
})

export default ItemList;









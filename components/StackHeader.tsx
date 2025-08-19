import usePaperTheme from '@/hooks/usePaperTheme';
import { router, usePathname } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';

const StackHeader = (props :  React.ComponentProps<typeof View> & {
        options: {
            title: string;
        };
    }
) => {


    const paperTheme = usePaperTheme();

    const pathname = usePathname();
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 4,
                backgroundColor: paperTheme.colors.surface,
                borderBottomWidth: 1,
                borderBottomColor: paperTheme.colors.onSurface,

            }}
        >
            <Text
                style={{
                    color: paperTheme.colors.primary,
                    fontSize: 20,
                    fontWeight: 'bold',
                }}
            >   
                {props.options.title || 'Home'} 
            </Text>



           {(router.canGoBack() || pathname !== '/') && <TouchableOpacity
                className='flex-row items-center'
                onPress={() => {
                    if (router.canGoBack()) {
                        router.back();
                    }
                }}
            >
                <IconButton icon={"arrow-left"} iconColor={paperTheme.colors.primary} style={{ marginRight: 0 }} />
                <Text style={{ color: paperTheme.colors.primary }}>
                    Back
                </Text>
            </TouchableOpacity>}




        </View>
    )
}

export default StackHeader
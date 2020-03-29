import React from "react";
import {List, Card} from 'antd';

const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
    {
        title: 'Title 5',
    },
    {
        title: 'Title 6',
    },
    {
        title: 'Title 6',
    },
    {
        title: 'Title 6',
    },
    {
        title: 'Title 6',
    },
    {
        title: 'Title 6',
    },
    {
        title: 'Title 6',
    },
    {
        title: 'Title 6',
    },
];

const TruckMenu = () => {
    return (
        <List style={{
            width: '100%',
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <Card title={item.title} >Card content</Card>
                </List.Item>
            )}
        />
    );
};

export default TruckMenu;
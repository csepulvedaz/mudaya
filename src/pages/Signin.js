//This is singup
import React, { useState } from "react";
import "antd/dist/antd.css";
import { makeStyles } from "@material-ui/core/styles";
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch
} from "antd";

const useStyles = makeStyles(() => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        background: "#ccc"
    },
    form: {
        width: "500px",
        background: "#fafafa"
    },
    input: {
        height:"100px"
    }
}));

const Signin = () => {
    const classes = useStyles();
    const [componentSize, setComponentSize] = useState("small");

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    return (
        <div className={classes.paper}>
            <Form
                className={classes.form}
                labelCol={{
                    span: 4
                }}
                wrapperCol={{
                    span: 14
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="middle">Middle</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Input">
                    <Input className={classes.input}/>
                </Form.Item>
                <Form.Item label="Select">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="TreeSelect">
                    <TreeSelect
                        treeData={[
                            {
                                title: "Light",
                                value: "light",
                                children: [
                                    {
                                        title: "Bamboo",
                                        value: "bamboo"
                                    }
                                ]
                            }
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Cascader">
                    <Cascader
                        options={[
                            {
                                value: "zhejiang",
                                label: "Zhejiang",
                                children: [
                                    {
                                        value: "hangzhou",
                                        label: "Hangzhou"
                                    }
                                ]
                            }
                        ]}
                    />
                </Form.Item>
                <Form.Item label="DatePicker">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="InputNumber">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Switch">
                    <Switch />
                </Form.Item>
                <Form.Item label="Button">
                    <Button>Button</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Signin;

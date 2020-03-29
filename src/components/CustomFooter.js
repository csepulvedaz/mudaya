import React from "react";
import {Layout} from 'antd';

const { Footer  } = Layout;

const CustomFooter = () => {

    return (
        <Footer theme="light" style={{ textAlign: 'center' }}>
            MudaYa ©2020 Created for Software Engineering II<br/>
            Universidad Nacional de Colombia<br/>
            All Rights reserved. For further information, contact fpieschaconr@unal.edu.co<br/>
        </Footer>
    );
};

export default CustomFooter;
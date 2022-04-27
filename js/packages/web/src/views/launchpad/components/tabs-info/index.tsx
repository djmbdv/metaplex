import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export const TabsInfo = ()=>{
    const callback = ()=>console.log("hola")
    return(
     <>
       <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Roadmap" key="1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at turpis a massa convallis hendrerit non quis quam. Suspendisse potenti. Quisque malesuada magna a libero eleifend efficitur. Pellentesque tortor quam, molestie eget viverra eget, vehicula eu ipsum. Quisque hendrerit augue vel dui euismod dictum. Nullam tempor magna ut varius eleifend. Aliquam quam massa, elementum sed dolor sed, rhoncus lacinia dolor. Fusce ligula dui, luctus vitae neque nec, hendrerit mattis nibh. Aliquam ac erat a lectus tincidunt feugiat.
                    </TabPane>
                    <TabPane tab="Team" key="2">
                    Content of Tab Pane 1
                    </TabPane>
        </Tabs>
     </>   
    )
}
import React from 'react';
import { Tabs } from 'antd';
import {Typography} from "antd";

const { Title,Paragraph } = Typography;
const { TabPane } = Tabs;

export const TabsInfo = ()=>{
    const callback = ()=>console.log("hola")
    return(
     <>
       <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Roadmap" key="1">
                    <Title level={5}>Roadmap</Title>
                    <li>16/06/2022 10:00 PST/ 19:00 CET</li>
                    <Paragraph>
                    Start of private sale. Limited availability of 1000 Louis XV 2018 NFT’s.
                    </Paragraph>
	                  <li>50% sold</li>
                    <Paragraph>
                    An exclusive Louis XV holder-only community will be launched.
                  	</Paragraph>
                    <li>100% sold</li>
                    <Paragraph>
                    Our next Champagne de Venoge NFT will be revealed.
                    </Paragraph>
                    <li>01/01/2026</li>
                    <Paragraph>
                    Your Champagne de Venoge Louis XV 2018 Bottles are claimable for shipping.
                    </Paragraph>
                    </TabPane>
                    <TabPane tab="Team" key="2">
                    <Title level={5}>Team</Title>
                    <Paragraph>Champagne De Venoge</Paragraph>
                    <Paragraph>
Created in 1837, the House of De Venoge is the product of a great dynasty. Known for being the champagne of Sarah Bernhardt and the Countess of Segur, today, the numerous awards obtained perpetuate and confirm the quality of its champagnes.
</Paragraph>
<Paragraph>
The House of De Venoge has one of the most important wine libraries in Champagne. It also offers us three exceptional ranges: the Cordon Bleu vintages dominated by Pinot Noir, the Princes range characterized by its elegance and finally the Louis XV vintages, the quintessence of the know-how of the Maison de Venoge.

</Paragraph>               
                    </TabPane>
        </Tabs>
     </>   
    )
}
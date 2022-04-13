import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export const TabsInfo = ()=>{
    const callback = ()=>console.log("hola")
    return(
     <>
       <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Roadmap" key="1">
                    Ancora Roadmap will be broken into two parts. One is on the product, AncoraOS and another on improving investors' holdings, Ancora DAO.


👽 AncoraOS 👽


Our primary focus is to ensure Ancora goes to market as soon as possible. To build a solid product, we need to focus on product-market fit and make the product accessible for developers for scalability. After creating a working product, we will integrate with multiple channels such as eCommerce and physical payments system.


As we dive in more on the product road, we will focus on UXUI to give the best onboarding experience and provide valuable insights and analytics to help merchants track their sales. We also seek more added features such as Fiat Ramp, lower fee and Ancora Debit Card.


🚀 AncoraDAO 🚀


As fees and royalties are being deposited into the DAO, our strategy to build our treasury is to partner with big international brands like Nike and Adidas to boost our exposure and slowly move into governance and leverage Defi yields to improve holdings. We will also look into low hanging markets like countries with low adoption of digital payments and small digital commerce stores to build our merchant base.


Important Milestones


Q2 - 2022 Launch headless MVP ‍Team expansion ANCO Staking Platform IDO Launch


Q3 - 2022 First Large Retail partnership API-First Services Commercial Payments Business Payouts NFT Dual Checkout (Credit Card/Crypto)


Q4 - 2022 First Ancora Hackathon Consumer Payments AncoraDAO & Governance L2 proposal for Solana Focus on Global adoption Integration with Shopify and other platforms


H1 - 2023 Cards & IBAN issuance through API Fiat Ramp for developers White-label mobile app


H2 - 2023 Platform officially launched. Next Future Vision Borderless Commerce Offline Processing Exclusive Brands partnerships Custom Shipping and reduced fees


                    </TabPane>
                    <TabPane tab="Team" key="2">
                    Content of Tab Pane 1
                    </TabPane>
        </Tabs>
     </>   
    )
}
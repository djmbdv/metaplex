import React from "react";
import {Typography} from "antd";
import { Layout,Row,Col } from 'antd';
import { SocialNetworking } from '../components/socialmedia'

const { Title,Paragraph } = Typography;

export const InfoLaunchpad = ()=>{
    return(
        <>
        <Title level={2}>Louis XV</Title>
        <Row className="white-Paper-contract" gutter={{ xs: 24, sm: 16, md: 24, lg: 32}} >
           <Col md={8} xs={{span:24,order:1}} >
            <Row><Paragraph>WHITE PAPER</Paragraph></Row>
            <Row><Paragraph>CONTRACT</Paragraph></Row>
           </Col>
           <Col md={15} xs={{span:24,order:2}}  >
             {/* redes sociales */}
             <Row className="wrap-total-social" justify="center" >
              <Col md={4} xs={{ span : 6}} ><SocialNetworking className="redSocial" img="/twitter-BL.svg" url="/"  /></Col>
              <Col md={4} xs={{ span : 6}}><SocialNetworking className="redSocial" img="/discord-BL.svg" url="/"  /></Col>
              <Col md={4} xs={{ span : 6}}><SocialNetworking className="redSocial" img="/instagram-BL.svg" url="/"  /></Col>
              <Col md={4} xs={{ span : 6}}><SocialNetworking className="redSocial" img="/web-BL.svg" url="/"  /></Col>
            </Row>
            <Row>
              <Col> &nbsp; </Col>
            </Row>
           </Col>
        </Row>
        <Title level={4}>DESCRIPTION</Title>
        <Paragraph>
        Cuvée de prestige Louis XV 2018 from Champagne De Venoge is sourced with Grands Crus only. Louis XV champagne is elaborated without malolactic fermentation.
        </Paragraph>
        <Paragraph>
        This sublime cuvée is elaborated from a blend composed of 50% Chardonnay and 50% Pinot noir. It unveils a subtle nose, very mineral which forecast a wonderfull aging potential. Following 10 years of raising, the palate offers fine and intense aromas of citrus and almonds. The attack is powerful and the freshness is not less than outstanding. The finish is saline.
        </Paragraph>
        <Paragraph>
        This champagne is of a very high elegance and will delight the amateurs of the greatest champagnes, in this extraordinary 2018 vintage.
        </Paragraph>
        <Paragraph>
        This unique and rare bottle is presented in its luxury case, thus representing a highly desirable gift.
      </Paragraph>

        </>
    )
}
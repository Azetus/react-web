import React from 'react';
// import { Header } from "./components/header";
// import { Footer } from "./components/footer";
import {
  Header,
  Footer,
  SideMenu,
  Carousel,
  ProductCollection,
  BusinessPartners
} from '../../components';
import { Row, Col, Typography, Spin } from 'antd';
// import { productList1, productList2, productList3 } from './mockups'; // 假数据
import { MainLayout } from '../../layouts/mainLayout';

import Styles from './HomePage.module.css';

// import { Link } from 'react-router-dom'

import sideImage from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';

// 高阶组件
import { withTranslation } from 'react-i18next';
// TS 类型定义
import { WithTranslation } from 'react-i18next';

import axios from 'axios';

import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { giveMeDataActionCreator } from '../../redux/recommendProducts/recommendProductsActions';

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // fetchStart: () => {
    //   dispatch(fetchRecommendProductStartActionCreator());
    // },
    giveMeData: () => {
      dispatch(giveMeDataActionCreator());
    }
  };
};

type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends React.Component<PropsType> {
  componentDidMount() {
    this.props.giveMeData();
  }

  render() {
    // console.log(this.props.t);
    const { t, productList, loading, error } = this.props;

    if (loading) {
      return (
        <Spin
          size="large"
          style={{
            marginTop: 200,
            marginBottom: 200,
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%'
          }}
        />
      );
    }

    if (error !== null) {
      return <div>网站出错：{error}</div>;
    }

    return (
      <MainLayout>
        {/* 页面内容 */}
        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>
        <ProductCollection
          title={
            <Typography.Title level={3} type="warning">
              {t('home_page.hot_recommended')}
            </Typography.Title>
          }
          sideImage={sideImage}
          products={productList[0].touristRoutes}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="danger">
              {t('home_page.new_arrival')}
            </Typography.Title>
          }
          sideImage={sideImage2}
          products={productList[1].touristRoutes}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="success">
              {t('home_page.domestic_travel')}
            </Typography.Title>
          }
          sideImage={sideImage3}
          products={productList[2].touristRoutes}
        />
        <BusinessPartners />
      </MainLayout>
    );
  }
}

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(HomePageComponent));

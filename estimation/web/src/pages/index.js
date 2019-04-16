import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import { Card } from 'estimation-components/dist/estimation-components.cjs';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Card />
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;

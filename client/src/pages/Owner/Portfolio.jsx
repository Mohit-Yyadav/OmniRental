import React from 'react';
import { Row, Col, Card, Table, Tag, Button } from 'antd';
import { HomeOutlined, StarOutlined, DollarOutlined } from '@ant-design/icons';

const Portfolio = () => {
  const properties = [
    {
      id: 1,
      address: '123 Main St',
      type: 'Apartment',
      units: 4,
      occupancy: '75%',
      value: '$1.2M',
      income: '$8,000/mo'
    },
    // ... more properties
  ];

  const columns = [
    { title: 'Address', dataIndex: 'address' },
    { title: 'Type', dataIndex: 'type' },
    { title: 'Units', dataIndex: 'units' },
    { 
      title: 'Occupancy', 
      dataIndex: 'occupancy',
      render: text => <Tag color={text === '100%' ? 'green' : 'orange'}>{text}</Tag>
    },
    { title: 'Value', dataIndex: 'value' },
    { title: 'Monthly Income', dataIndex: 'income' },
    { title: 'Action', render: () => <Button type="link">Manage</Button> }
  ];

  return (
    <div className="owner-portfolio">
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Property Portfolio">
            <Table 
              columns={columns} 
              dataSource={properties} 
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Portfolio;
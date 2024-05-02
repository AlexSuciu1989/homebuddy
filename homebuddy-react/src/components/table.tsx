import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button, Select, DatePicker, DatePickerProps, ConfigProvider, Breakpoint, Popover } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import moment from 'moment';
import { getCookie } from './getcookies';
import '../css/budget-buddy.css';

let storedDateString: string | string[]; 
const loggedUser = getCookie("username");


const onChange: DatePickerProps['onChange'] = (date: any, dateString: string | string[]) => {
  console.log(typeof date);
  console.log(dateString);
  console.log(typeof dateString);
  storedDateString = dateString;
 
};

const { Option } = Select;

interface Item {
  key: string;
  date: string | string[] | Date | any ;
  amount: number;
  description: string;
  type: string;
  tag: string;
  username: string | null;
}

interface EditableCellProps {
  editing: boolean;
  dataIndex: string;
  date: string | string[];
  title: any;
  inputType: 'number' | 'text' | 'select' | 'date';
  record: Item;
  index: number;
  children: React.ReactNode;
  types?: string[]; // List of selectable types
  tags?: string[];
  
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  types,
  tags,
  ...restProps
}) => {
  
  const inputNode =
    inputType === 'number' ? <InputNumber /> :
    inputType === 'select' && types ? (
      <Select>
        {types.map(type => <Option key={type} value={type}>{type}</Option>)}
      </Select>
    ) :
    inputType === 'date' ? (
      <DatePicker style={{ width: '100%' }} />
    ) :
    inputType === 'select' && tags ? (
      <Select>
        {tags.map(tag => <Option key={tag} value={tag}>{tag}</Option>)}
      </Select>
    ) : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: false,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        // Always render DatePicker when not editing
        <span>{dataIndex === 'date' ? moment(record.date).format('YYYY-MM-DD') : children} </span>
        
      )}
    </td>
  );
 
};



const Tables: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [editingKey, setEditingKey] = useState<string>('');

  const isEditing = (record: Item) => record.key === editingKey;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://homebuddy.ro/php/get-budget-from-sql.php?loggedUser=" +
      encodeURIComponent(loggedUser!));
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const budgetdata = await response.json();
      console.log(budgetdata)
      const formattedData = budgetdata.map((data: any) => ({
        key: data.id,
        date: moment(data.adddate), // Check if the date is valid before formatting
        amount: data.amount,
        description: data.adddescription,
        type: data.addtype,
        tag: data.tag
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching account information:", error);
    }
  };
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    
    form.setFieldsValue({ date: '' ,amount: '', description: '', type: '', tag: '', ...record});
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
  
      // Ensure storedDateString is defined and not an empty string
      // if (storedDateString !== undefined && storedDateString !== '') {
      //   row.date = storedDateString;
      // }  
      const expectedKey = (data.length).toString();
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
  
        if (key.toString() === expectedKey) {
          saveToSQL(row, 'saving', key);
        } else {
          saveToSQL(row, 'updating', key);
        }
      } else {
        if (key.toString() === expectedKey) {
          saveToSQL(row, 'saving', key);
        } else {
          saveToSQL(row, 'updating', key);
        }
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  
  

  const addRow = async () => {
    const newRow: Item = {
      key: (data.length + 1).toString(), // Generate a unique key for the new row
      date: '',
      amount: 0,
      description: '',
      type: '',
      tag: '',
      username: '',
    };
    setData([newRow, ...data]);
    edit(newRow); // Start editing the new row immediately
  };

  const saveToSQL = async (rowData: Item, action: string, key: any) => {
    rowData.key = key;
    rowData.username = loggedUser;
    if (action === 'saving') {
      
      console.log('Saving to SQL:', rowData);
      
      try {
        const response = await fetch(
          "https://homebuddy.ro/php/save-budget-to-sql.php",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(rowData),
          }
        );
        if (!response.ok) {
          throw new Error('Network response for NEW was not ok');
        } 
      }catch (error){
          console.error(error);
      }
    } else if (action === 'updating') {
      console.log('Updating in SQL:', rowData);
try{


      const response = await fetch(
        "https://homebuddy.ro/php/update-budget-to-sql.php",
        {
          method: "UPDATE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(rowData),
        }
      );
      if (!response.ok) {
        throw new Error ("Network response for UPDATE was not OK");
      }
    }catch (error){
      console.error(error);
  }
    }
  };

  const types = ['Income', 'Payment']; // Define selectable types
  const tags =['Salary', 'House','Car', 'Health', 'Loan', 'Food', 'Education', 'Investment', 'Entertainment', 'Junk', 'Others'];

  const filtersDate = [];
  const currentYear = moment().year();

  for (let month = 0; month < 12; month++) {
    const monthDate = moment().year(currentYear).month(month);
    filtersDate.push({
        text: monthDate.format('MMMM'),
        value: monthDate.format('MMMM')
    });
}

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      width: '10%',
      editable: true,
      inputType: 'date',
      filters: filtersDate,
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value:any, record:any) => {
        // Extract the month part from the 'date' property
        const recordMonth = moment(record.date).format('MMMM');
      
        // Check if the record's month matches the filter value
        return recordMonth === value;
      }


    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: '10%',
      editable: true,
      
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      width: '10%',
      editable: true,
      inputType: 'select',
      tags: tags,
    },

    {
      title: 'Description',
      dataIndex: 'description',
      width: '40%',
      editable: true,
      // responsive: ['md'],
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: '10%',
      editable: true,
      inputType: 'select', // Specify input type as 'select'
      types: types, // Pass the list of selectable types
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col:any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'amount' ? 'number' : col.dataIndex === "tag" ? 'select' : col.dataIndex === 'type' ? 'select' : col.dataIndex === 'date' ? 'date' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        date: col.dataIndex === 'date' ? record.date : undefined, // Pass the date prop if dataIndex is 'date'
        types: col.dataIndex === 'type' ? types : undefined,
        tags: col.dataIndex === 'tag' ? tags: undefined,
        
      }),
    };
  });
  
      
  return (
    <>
      <Button type="primary" onClick={addRow} style={{ marginBottom: 16 }}>
        Add Row
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          size="middle"
          scroll={{ x: 'calc(700px + 50%)' }}
        />
      </Form>
    </>
  );

};

export default Tables;
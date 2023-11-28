/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Form, message, Space } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import moment from 'moment';
import { useMemo, useRef, useState } from 'react';

import { BreadcrumbRootAntD } from '@/coreVTM/breadcrumb';
import { ButtonRootAntD } from '@/coreVTM/button';
import { CardRootAntD } from '@/coreVTM/card';
import { CheckboxGroupAntD, CheckboxRootAntD } from '@/coreVTM/checkbox';
import { CollapseCommon } from '@/coreVTM/collapse/Collapse';
import { CollapseSingleCommon } from '@/coreVTM/collapseSingle/CollapseSingle';
import { CollapsibleContent } from '@/coreVTM/collapsible/Collapsible';
import { DatePickerAntd } from '@/coreVTM/datePickerAntd/DatePickerAntd';
// import DateRangePicker from '@/coreAntd/DateRangePicker/DateRangePicker';
import DateTimePicker from '@/coreVTM/datetimepicker/DateRangePicker';
import DropdownCommon from '@/coreVTM/dropdown/Dropdown';
import { EmptyRootAntD } from '@/coreVTM/empty';
import { ScrollToTopFloat } from '@/coreVTM/floatbutton';
import { Icon } from '@/coreVTM/iconv2';
import { ImageRootAntD } from '@/coreVTM/image';
import InputAntd from '@/coreVTM/inputAntd/InputAntd';
import InputPassword from '@/coreVTM/inputAntd/InputPassWord';
import { LinkRootAntD } from '@/coreVTM/link';
import LoaderRootAntD from '@/coreVTM/loader/root';
import ModalAntd from '@/coreVTM/modalAntd/ModalAntd';
import { NotificationRootAntD } from '@/coreVTM/notification';
import { PaginationRootAntD } from '@/coreVTM/pagination';
import PopoverCommon from '@/coreVTM/popover/Popover';
import { QRCodeRootAntD } from '@/coreVTM/qrcode';
import RadioAntd from '@/coreVTM/radio/Radio';
import RadioOptionSetting from '@/coreVTM/radio/RadioOptionSetting';
import { SelectionCommon } from '@/coreVTM/selection/Selection';
import { StepsCommon } from '@/coreVTM/step/Step';
import { StepByStepCommon } from '@/coreVTM/stepbystep/StepByStep';
import { SwitchRootAntD } from '@/coreVTM/switch';
import TableCommon from '@/coreVTM/table/Table';
import { TabsRootAntD } from '@/coreVTM/tabs';
import TagCommon from '@/coreVTM/tag/Tag';
import TextAreaAntd from '@/coreVTM/textareaAntd/TextAreaAntd';
import { type TextAreaCommonRef } from '@/coreVTM/textareaAntd/type';
import TextRootAntD from '@/coreVTM/typography/text';
import TitleRootAntD from '@/coreVTM/typography/title';
import { UploadCommon } from '@/coreVTM/upload/UploadCommon';
// import { PreviewFile } from '@/coreAntd/uploadAntd/PreviewFile';
// import { Upload } from '@/coreAntd/uploadAntd/Upload';
import { useModalCommon } from '@/hooks/useModalCommon';

// import ComponentLogout from '../logout/component';

const PageDemoComponent = () => {
  const showMessageSuccess = (msg: string) => {
    message.success(msg);
  };
  const { visible: visibleModal, openModal: handleOpenModal, closeModal: handleCloseModal } = useModalCommon();
  const [text, setText] = useState<string>('');
  const [passWord, setPassWord] = useState<string | number>('');
  // const [message, setMessage] = useState<any>(' ');
  const textareaRef = useRef<TextAreaCommonRef | null>(null);
  const [selectedDates, setSelectedDates] = useState({ from: null, to: null });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setDates] = useState({ from: null, to: null });
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedOptionValue, setSelectedOptionValue] = useState(null);
  const [getValue, setGetValue] = useState('');
  const [form] = Form.useForm();
  const [formValue, setFormValue] = useState('');

  const [uploadFileList, setUploadFileList] = useState([]);

  const handleUploadChange = (info: any) => {
    setUploadFileList(info.fileList);
  };
  // const [filteredValues, setFilteredValues] = useState([]);
  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };
  const [activeKey, setActiveKey] = useState([' ']);

  const handleCollapseChange = (keys: any) => {
    setActiveKey(keys);
  };
  // const [fileList, setFileList] = useState([]);

  // const handleFileChange = (newFileList: any) => {
  //   setFileList(newFileList);
  // };
  const options = useMemo(
    () => [
      { value: 'option1', content: 'Option 1' },
      { value: 'option2', content: 'Option 2' },
      { value: 'option3', content: 'Option 3', disabled: true },
    ],
    [],
  );
  const menuItems = [
    { name: 'item1', active: true, content: 'Item 1' },
    { name: 'item2', active: false, content: 'Item 2' },
    { name: 'item3', active: false, content: 'Item 3' },
  ];
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  const handleChangeOption = (value: string) => {
    setSelectedValue(value);
  };
  const handleChange = (e: any) => {
    setText(e);
  };
  const handleChangePassWord = (e: any) => {
    setPassWord(e);
    // console.log('passWord', passWord);
  };
  const handleChangeMessage = (e: any) => {
    setGetValue(e.target.value);
    // console.log('message', message);
  };
  const handleGetValue = () => {
    if (textareaRef.current) {
      const value = textareaRef.current.getValue();
      console.log('current-value', value);
    }
  };
  const handleFocus = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  const handleDateChange = (date: moment.Moment | null, dateString: string) => {
    // console.log('Date String:', dateString);
    console.log('Selected Date:', date);
  };

  const handleRangeChange = (value: any) => {
    setSelectedDates(value);
  };

  const selectionRef = useRef(null);

  const optionSelect = [
    { key: 'option1', value: 'Option 1' },
    { key: 'option2', value: 'Option 2' },
    { key: 'option3', value: 'Option 3' },
  ];

  const handleSelectionChange = (value: any) => {
    setSelectedOptionValue(value);
  };

  const handleAddNewOption = (newOption: any) => {
    if (newOption) {
      options.push({ content: newOption, value: newOption });
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      selectionRef.current;
      setSelectedOptionValue(newOption);
    }
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
  };
  // submit form
  const onSubmit = async () => {
    const values = await form.validateFields();
    // format dob
    if (values.dateOfBirth) {
      values.dateOfBirth = dayjs(values.dateOfBirth).toISOString();
    }
    setFormValue(values);
    setTimeout(() => {
      showMessageSuccess('Nhập thành công');
    }, 1000);
    form.resetFields();
    // return values;
  };
  ///
  // table
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag: any) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <TagCommon
                color={color}
                key={tag}
                size='small'>
                {tag.toUpperCase()}
              </TagCommon>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  // colaplse
  const CollapseItems = [
    {
      key: '1',
      header: 'Mục 1',
      content: 'Nội dung mục 1',
    },
    {
      key: '2',
      header: 'Mục 2',
      content: 'Nội dung mục 2',
    },
    {
      key: '3',
      header: 'Mục 3',
      content: 'Nội dung mục 3',
    },
  ];

  // checkbox group
  const optionsCheckbox = [
    { label: 'Option A', value: 'A' },
    { label: 'Option B', value: 'B' },
    { label: 'Option C', value: 'C' },
  ];
  // collapsible
  const content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi vero assumenda ullam temporibus cupiditate voluptas reiciendis laudantium ipsa cumque pariatur voluptatibus tempore hic praesentium dolore rem, quia itaque perspiciatis architecto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, nulla voluptatum nesciunt esse beatae ab consequuntur qui sunt tempore doloremque nemo! Eius provident reprehenderit sint libero quasi placeat vitae minima.`;
  /// preview file

  // interface CustomFile {
  //   uid: string;
  //   name: string;
  //   imageUrl?: string;
  //   // Add other required properties based on the Attachment type
  //   // type: string;
  //   // extension: string;
  //   _id: string;
  //   // ...
  // }
  // const fileListPreview: CustomFile[] = [
  //   {
  //     uid: '1',
  //     name: 'sample-image.jpg',
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1553708881-112abc53fe54?auto=format&fit=crop&q=80&w=1074&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     _id: '616161616161616161616161',
  //   },
  //   {
  //     uid: '2',
  //     name: 'sample-document.pdf',
  //     imageUrl: '/path/to/sample-document.pdf',
  //     _id: '616161616161616161616162',
  //   },
  //   // Add more file entries as needed
  // ];
  // const [open, setOpen] = useState(false);
  // const [fileSelected, setFileSelected] = useState(null);

  // const handleOpenModalPreview = (file: any) => {
  //   setFileSelected(file);
  //   setOpen(true);
  // };

  // const handleCloseModalPreview = () => {
  //   setOpen(false);
  // };
  /// stepCommon
  const stepsData = [
    { title: 'Bước 1', description: 'Nội dung của bước 1', content: <p>hahahah</p> },
    { title: 'Bước 2', description: 'Nội dung của bước 2', content: <p>khahahah</p> },
    { title: 'Bước 3', description: 'Nội dung của bước 3', content: <p>jkahahah</p> },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const handleStepChange = (current: number) => {
    setCurrentStep(current);
  };
  return (
    <div style={{ paddingBottom: 300, paddingLeft: 120, paddingRight: 30 }}>
      {/* <ComponentLogout /> */}
      {/* <FloatButtonRootAntD style={{ right: 100 }}>dfwefwewewewe</FloatButtonRootAntD> */}
      <div>
        <h1>Step by step with antd</h1>
        <StepByStepCommon
          items={stepsData}
          current={currentStep}
          onChange={handleStepChange}>
          {currentStep < stepsData?.length - 1 && (
            <Button
              type='primary'
              onClick={() => {
                setCurrentStep(currentStep + 1);
              }}>
              Next
            </Button>
          )}
          {currentStep === stepsData?.length - 1 && (
            <Button
              type='primary'
              onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {currentStep > 0 && (
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => {
                setCurrentStep(currentStep - 1);
              }}>
              Previous
            </Button>
          )}
        </StepByStepCommon>
      </div>
      <div>
        <h1>Collapse with antd</h1>
        <CollapseCommon
          items={CollapseItems}
          activeKey={activeKey}
          onChange={handleCollapseChange}
          bordered={true}
        />
      </div>
      <div>
        <h1>CollapseSingle with antd</h1>
        <CollapseSingleCommon
          key={1}
          header='collapsingle'
          extra={
            <CollapsibleContent
              content={content}
              maxLength={100}
            />
          }
        />
      </div>
      <div>
        <h1>Modal with antd</h1>
        <button onClick={handleOpenModal}>Open Modal</button>
        <ModalAntd
          title='text modal'
          centered
          open={visibleModal}
          handleOk={handleCloseModal}
          handleCancel={handleCloseModal}
          footer>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor optio, possimus deserunt illum nihil, commodi
            soluta fugit minima vero reiciendis ex quod! Itaque laudantium amet odio eius quia. Officiis, animi!
          </p>
        </ModalAntd>
      </div>
      <div>
        <h1>Input with antd</h1>
        <div>
          <InputAntd
            placeholder='please write your name here'
            type='text'
            size='large'
            name='name'
            value={text}
            onChange={handleChange}
          />
        </div>
        <div>
          <InputPassword
            placeholder='please write your password'
            type='password'
            size='large'
            name='password'
            value={passWord}
            onChange={handleChangePassWord}
          />
        </div>
      </div>
      <div>
        <h1>textArea with antd</h1>
        <div>
          <TextAreaAntd
            textareaRef={textareaRef}
            name='message'
            rows={5}
            placeholder='please write your message in here'
            label='Message'
            value={getValue}
            onChange={handleChangeMessage}
          />
          <button onClick={handleGetValue}>Get value</button>
          <button onClick={handleFocus}>Focus</button>
        </div>
      </div>
      <div>
        <h1>DatePicker with antd</h1>
        <div>
          {/* you can use dayjs instead of moment by replace monment => dayjs */}
          <DatePickerAntd
            onChange={handleDateChange}
            picker='date'
            defaultValue={dayjs()}
            showTime={false}
            format={['DD-MM-YYYY', 'DD-MM-YY']}
            // just test not apply
            // disabledDate={(current: moment.Moment | undefined) => {
            //   return current ? current.isAfter(moment().endOf('day')) : false;
            // }}
            placeholder='Select date'
            showNow={true}
            disabled={false}
          />
        </div>
      </div>
      <div>
        <h1>DateRangePicker with antd</h1>
        <div>
          <DateTimePicker
            onChange={handleRangeChange}
            // defaultValue={selectedDates}
            placeholder={['bắt đau', 'kết thúc']}
            defaultValue={[dayjs('2020-01-01'), dayjs('2020-01-02')]}
            value={selectedDates}
            renderExtraFooter={() => (
              <ButtonRootAntD
                size='small'
                type='primary'
                onClick={() => {
                  setDates(selectedDates);
                }}>
                OK
              </ButtonRootAntD>
            )}
          />
        </div>
      </div>
      <div>
        <h1>Radio with antd</h1>
        <div>
          <RadioAntd
            options={options}
            value={selectedOption}
            onChange={handleOptionChange}
          />
        </div>
      </div>

      <div>
        <h1>Radio Option Settings</h1>
        {options.map(item => (
          <div key={item.value}>
            <RadioOptionSetting
              value={item.value}
              checked={item.value === selectedValue}
              label={item.content}
              onChange={handleChangeOption}
              icon={'asas'}
            />
          </div>
        ))}
      </div>
      <div>
        <h1>selection with antd</h1>
        <div>
          <SelectionCommon
            ref={selectionRef}
            options={optionSelect}
            label='Select an option'
            value={selectedOptionValue}
            onChange={handleSelectionChange}
            onAddNew={handleAddNewOption}
            hasAddNewOption={false}
            placeholderOptionAdd='Add a new option'
          />
        </div>
      </div>
      <div>
        <h1>Poppover</h1>
        <PopoverCommon
          trigger='hover'
          content='text popover'
          placement='bottomRight'>
          <button> click here</button>
        </PopoverCommon>
      </div>
      <div style={{ paddingBottom: 50 }}>
        <h1>dropdown</h1>
        <DropdownCommon menuItem={menuItems}>
          <span>click me</span>
        </DropdownCommon>
      </div>
      <div>
        <h1>table with antd</h1>
        <TableCommon
          columns={columns}
          dataSource={data}
          height={'100vh'}
        />
      </div>
      <div>
        <h1>step with antd</h1>
        <StepsCommon
          current={currentStep}
          onChange={handleStepChange}
          items={stepsData}
          direction='horizontal'
        />
      </div>
      <div>
        <h1>Image & ratio</h1>
        <div style={{ width: 100 }}>
          <ImageRootAntD
            src='https://picsum.photos/200'
            ratio='1x2'
          />
        </div>
        <div style={{ width: 300 }}>
          <ImageRootAntD
            src='https://picsum.photos/200'
            ratio='16x9'
          />
        </div>
        <div>
          <h1>Button && Floatbutton</h1>
          <ButtonRootAntD
            children='button'
            type='primary'
          />
        </div>
        <div>
          <h1>Link</h1>
          <LinkRootAntD
            href='https://youtube.com'
            children='link chứa giao thức http'
          />
          <LinkRootAntD
            href='/login'
            children='Router Link'
          />
        </div>
        <div>
          <h1>Switch</h1>
          <SwitchRootAntD
            labelLeft='Tiếng Việt'
            labelRight='English'
            checkedChildren='VN'
            unCheckedChildren='EN'
          />
        </div>
        <div>
          <h1>Icon</h1>
          <Icon
            size='24x24'
            name='home'
          />
          <Icon
            size='18x18'
            name='loader'
          />
          <Icon
            size='32x32'
            name='error'
          />
          <Icon
            size='24x24'
            name='error'
          />
          <Icon
            size='18x18'
            name='error'
          />
        </div>
        <div>
          <h1>Breadcrumb</h1>
          <BreadcrumbRootAntD
            items={[
              {
                title: 'Home',
              },
              {
                title: 'Application Center',
                href: '',
              },
              {
                title: 'Application List',
                href: '',
              },
              {
                title: 'An Application',
              },
            ]}
          />
        </div>
      </div>
      <ScrollToTopFloat />
      <h1>Loading</h1>
      <LoaderRootAntD>
        <div style={{ width: 200, height: 200 }}>
          <span>Loading</span>
        </div>
      </LoaderRootAntD>
      <h1> Pagination </h1>
      <div>
        <PaginationRootAntD
          current={currentPage}
          total={100}
          onChange={handlePageChange}
          pageSize={10}
        />
      </div>
      <h1> Tabs </h1>
      <div>
        <TabsRootAntD
          items={[
            {
              key: '1',
              label: 'Tab 1',
              children: 'Content of Tab Pane 1',
            },
            {
              key: '2',
              label: 'Tab 2',
              children: 'Content of Tab Pane 2',
            },
            {
              key: '3',
              label: 'Tab 3',
              children: 'Content of Tab Pane 3',
            },
          ]}
        />
      </div>
      <h1> Notification </h1>
      <div>
        <ButtonRootAntD
          onClick={() => {
            NotificationRootAntD({
              message: 'notification',
              type: 'error',
              description: 'notification',
              duration: 2,
              placement: 'topRight',
            });
          }}>
          Notification
        </ButtonRootAntD>
      </div>
      <h1> Heading </h1>
      <TitleRootAntD
        content='Heading'
        level={4}
        type='danger'
      />
      <h1> Text </h1>
      <TextRootAntD content='Text' />
      <h1>Checkbox</h1>
      <CheckboxRootAntD content='Checkbox' />
      <div>
        <h1>Form with antd</h1>
        <div className='form-common'>
          <Form form={form}>
            <div className='form-common-item'>
              <Form.Item
                key={'name'}
                label='useName'
                name='name'
                rules={[{ required: true, message: 'Please input your name!' }]}>
                <InputAntd
                  type='name'
                  placeholder='please input your name here'
                />
              </Form.Item>
              <Form.Item
                key={'password'}
                label='password'
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                  {
                    pattern: RegExp(/^\S{6,20}$/gm),
                    message: 'Length from 6 to 20 character, not include spacing',
                  },
                ]}>
                <InputPassword
                  type='password'
                  placeholder='please input your password here'
                />
              </Form.Item>
              <Form.Item
                label='Ngôn ngữ'
                name='languages'>
                <SwitchRootAntD
                  checkedChildren='VN'
                  unCheckedChildren='EN'
                />
              </Form.Item>
              <Form.Item
                key={'message'}
                label='message'
                name='message'>
                <TextAreaAntd
                  name='message'
                  placeholder='please input your messafe here'
                />
              </Form.Item>
              <Form.Item
                label='Ngày sinh'
                name={'dateOfBirth'}
                getValueProps={i => ({ value: moment(i) })}>
                <DatePickerAntd
                  picker='date'
                  defaultValue={moment()}
                  showTime={false}
                  format='YYYY-MM-DD'
                  disabledDate={(current: moment.Moment | undefined) => {
                    return current ? current.isAfter(moment().endOf('day')) : false;
                  }}
                  placeholder='Select a date'
                  showNow={true}
                  disabled={false}
                />
              </Form.Item>
              <Form.Item
                label='Thời gian'
                name={'startToEnd'}>
                <DateTimePicker />
              </Form.Item>
              <Form.Item
                label='select'
                name='select'>
                <SelectionCommon
                  ref={selectionRef}
                  options={optionSelect}
                  defaultValue={optionSelect[0]}
                  value={selectedOptionValue}
                  onChange={handleSelectionChange}
                  hasAddNewOption={false}
                />
              </Form.Item>
              <Form.Item
                name='radio'
                label='radio'>
                <RadioAntd
                  options={options}
                  value={selectedOption}
                  onChange={handleOptionChange}
                />
              </Form.Item>
              <Form.Item name='agree'>
                <CheckboxRootAntD content='Đồng ý điều khoản' />
              </Form.Item>
              <Form.Item
                name='checkbox-group'
                label='Checkbox.Group'>
                <CheckboxGroupAntD options={optionsCheckbox} />
              </Form.Item>
            </div>
          </Form>
        </div>
        <div>
          <ButtonRootAntD onClick={onSubmit}>Submit</ButtonRootAntD>
        </div>
      </div>
      <div>
        <h1>Upload with and</h1>
        <UploadCommon
          fileList={uploadFileList}
          onChange={handleUploadChange}
          listType='picture-card'
          showUploadList={true}
          maxCount={5}
          // size='large'
        >
          {/* Đây có thể là nút tải lên hoặc nội dung tùy chỉnh */}
          <div>
            <p>Click or drag files to this area to upload</p>
          </div>
        </UploadCommon>
      </div>
      <h2>Form value</h2>
      <div>{JSON.stringify(formValue)}</div>
      <h1>QR Code</h1>
      <QRCodeRootAntD value={'https://ant.design/'} />
      <h1>Card</h1>
      <CardRootAntD title='Card Title'>
        <p>Card Content</p>
      </CardRootAntD>
      <h1>Empty</h1>
      <div style={{ height: 100 }}>
        <EmptyRootAntD />
      </div>
      {/* <div>
        <h1>Upload with antd</h1>
        <Upload
          maxCount={5}
          fileSize={2} // 2MB
          fileList={fileList}
          onChange={handleFileChange}></Upload>
      </div> */}
      {/* <div>
        <h1>Preview file with antd</h1>
        <button
          onClick={() => {
            handleOpenModalPreview(fileList[0]);
          }}>
          Open File Preview
        </button>

        <PreviewFile
          open={open}
          fileListPreview={fileListPreview}
          onClose={handleCloseModalPreview}
          fileSelected={fileSelected}
        />
      </div> */}
    </div>
  );
};

export default PageDemoComponent;

import controller from './issues-form.controller';
import template from './issues-form.html';
import './issues-form.less';

export default {
  bindings: {
    onSubmit: '&',
    propsCategoryName: '<?categoryName',
    propsServiceName: '<?serviceName',
    propsServiceTypeName: '<?serviceTypeName',
  },
  controller,
  name: 'supportNewIssuesForm',
  template,
};

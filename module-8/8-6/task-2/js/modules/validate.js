const validate = (field, value) => {
  if (!field || !value) {
    return false;
  }

  let pattern = '';

  switch (field) {
    case 'holder':
      pattern = '^[a-z]{2,}[ ]+[a-z]{2,}$';
      break;

    case 'number':
      value = value.replace(/\s+/g, ''); // удаляю пробелы
      pattern = '^\\d{10,16}$';
      break;

    case 'date':
      pattern = '^(0[1-9]|1[0-2])/[2|3][0-9]$';
      break;

    case 'cvv':
      pattern = '^\\d{3}$';
      break;

    default:
      return false;
  }

  const regExp = new RegExp(pattern, 'i');
  const res = regExp.test(value);
  console.log(field, value, res);

  return res;
};

export default validate;

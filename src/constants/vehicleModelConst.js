const VehicleModelConst = [
  {
    name: 'name',
    label: 'Model Name',
    placeholder: 'Insert Model Name',
    rules: 'required',
    type: 'text',
    options: {
      autoTrimValue: true,
    },
  },
  {
    name: 'make',
    label: 'Make Name',
    placeholder: 'Select Make Name',
    rules: 'required',
    type: 'select',
    extra: [],
  },
  {
    name: 'engineType',
    label: 'Engine Type',
    placeholder: 'Insert Engine Type',
    rules: 'required',
    type: 'text',
    options: {
      autoTrimValue: true,
    },
  },
  {
    name: 'year',
    label: 'Year',
    placeholder: 'Insert Year',
    rules: 'required',
    type: 'text',
    options: {
      autoTrimValue: true,
    },
  },
  {
    name: 'bodyType',
    label: 'Body Type',
    placeholder: 'Insert Body Type',
    rules: 'required',
    type: 'text',
    options: {
      autoTrimValue: true,
    },
  },
];

export default VehicleModelConst;

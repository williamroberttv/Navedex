import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  job_role: Yup.string().required('O cargo é obrigatório'),
  birthdateValue: Yup.string().required('A idade é obrigatória'),
  admission_dateValue: Yup.string().required(
    'O tempo de empresa é obrigatório'
  ),
  project: Yup.string().required('Projetos é obrigatório'),
});

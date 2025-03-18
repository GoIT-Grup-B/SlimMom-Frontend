import {
  calculatorSchema,
  calculatorInitialValues,
} from '../../validations/schemas/calculatorSchema';
import { Formik, Form } from 'formik';
import CalculatorFormFields from './CalculatorFormFields';
import axios from 'axios';
import toast from 'react-hot-toast';

function CalculatorCalorieForm() {
  const handleSubmit = async (values) => {
    console.log(values);

    try {
      const res = await axios.post(
        'https://slimmom-backend-s8n8.onrender.com/user/daily-calory-needs',
        values,
      );
      console.log(res.data.data);
      toast.success(
        `Your daily calorie intake is ${res.data.data.dailyRate} kcal`,
      );
    } catch (e) {
      console.error(e);
      toast.error(e.response.data.message);
    }
  };
  return (
    <div className="px-[20px] py-[32px] flex flex-col gap-[40px]">
      <h2 className="font-bold text-[18px] ">
        Calculate your daily calorie intake right now
      </h2>
      <Formik
        initialValues={calculatorInitialValues}
        validationSchema={calculatorSchema}
        onSubmit={handleSubmit}
      >
        {({ values, submitForm }) => (
          <>
            <Form className=" space-y-4 form flex flex-col font-bold">
              <CalculatorFormFields values={values} />
            </Form>
            <button
              onClick={submitForm}
              type="submit"
              className="font-bold bg-orange-500 text-white p-2 rounded-full px-[25px] py-[13px]"
            >
              Start losing weight
            </button>
          </>
        )}
      </Formik>
    </div>
  );
}

export default CalculatorCalorieForm;

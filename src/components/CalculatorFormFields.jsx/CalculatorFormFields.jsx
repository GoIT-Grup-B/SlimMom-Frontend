import { Field, ErrorMessage } from 'formik';

function CalculatorFormFields({ values }) {
  return (
    <>
      <div className="flex">
        <Field
          name="height"
          type="number"
          placeholder="Height *"
          className="w-full border-b border-gray-200 pl-1 pb-2 focus:outline-none focus:border-gray-600 focus:placeholder-gray-600"
        />
        <ErrorMessage
          name="height"
          component="span"
          className="text-red-500 text-xs"
        />
      </div>
      <div className="flex">
        <Field
          name="age"
          type="number"
          placeholder="Age *"
          className="w-full border-b border-gray-200 pl-1 pb-2 focus:outline-none focus:border-gray-600 focus:placeholder-gray-600"
        />
        <ErrorMessage
          name="age"
          component="span"
          className="text-red-500 text-xs"
        />
      </div>
      <div className="flex">
        <Field
          name="currentWeight"
          type="number"
          placeholder="Current weight *"
          className="w-full border-b border-gray-200 pl-1 pb-2 focus:outline-none focus:border-gray-600 focus:placeholder-gray-600"
        />
        <ErrorMessage
          name="currentWeight"
          component="span"
          className="text-red-500 text-xs"
        />
      </div>
      <div className="flex">
        <Field
          name="desiredWeight"
          type="number"
          placeholder="Desired weight *"
          className="w-full border-b border-gray-200 pl-1 pb-2 focus:outline-none focus:border-gray-600 focus:placeholder-gray-600"
        />
        <ErrorMessage
          name="desiredWeight"
          component="span"
          className="text-red-500 text-xs"
        />
      </div>
      <div className="flex gap-8">
        {[1, 2, 3, 4].map((type) => {
          return (
            <label key={type} className="flex gap-1 align-center">
              <Field
                key={type}
                type="radio"
                name="bloodType"
                value={type}
                className="w-[20px]"
                checked={type === Number(values.bloodType)}
              />
              {type}
            </label>
          );
        })}
      </div>
    </>
  );
}

export default CalculatorFormFields;

interface Props {
  placeholder: string;
  label: string;
  errors: any;
  type: string;
  field?: object;
  height?: string;
}

export default function TextArea(props: Props) {
  return (
    <div>
      <label
        className="text-gray-400 font-semibold text-sm"
        htmlFor={props.label}
      >
        {props.label}
      </label>
      <textarea
        className={`
        block w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white border-2 border-gray-200 rounded-[12px] ${
          props.errors ? "border-red-500" : ""
        }`}
        {...props.field}
        placeholder={props.placeholder}
      />
      {props.errors ? <p className="text-red-500">{props.errors}</p> : ""}
    </div>
  );
}

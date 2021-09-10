import React from 'react';
import { UseFormRegister, FieldValues, FieldError, DeepMap } from 'react-hook-form';
import { Input } from 'reactstrap';
import { mapInnerRef } from 'tapis-ui/utils/forms';
import FieldWrapper from 'tapis-ui/_common/FieldWrapper';


export type Specs = {
  [name: string]: {
    label: string,
    tapisFile?: boolean,
    defaultValue?: string,
    required?: string,
    description: string
  }
}

export type DictFieldProps = {
  specs: Specs,
  refName: string,
  register: UseFormRegister<FieldValues>,
  errors: DeepMap<FieldValues, FieldError>,
}

const DictField: React.FC<DictFieldProps> = ({ refName, specs, errors, register }) => {
  return (
    <div>
      {
        Object.entries(specs).map(
          ([name, props]) =>  {
            // Using dot notation allows react-hook-form to parse this into an object
            const fieldRef = `${refName}.${name}`;
            const { label, defaultValue, required, description } = props;
            return (
              <FieldWrapper label={label} description={description} 
                error={errors[fieldRef]} required={!!required} key={fieldRef}>
                <Input 
                  bsSize="sm" defaultValue={defaultValue} 
                  {...mapInnerRef(register(fieldRef, { required }))}
                />
              </FieldWrapper>
            )
          }
        )
      }
    </div>
  )
}

export default DictField;
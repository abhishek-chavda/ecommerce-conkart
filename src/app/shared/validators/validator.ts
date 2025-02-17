import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function uniqueColorSizeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Check if the control is part of a FormArray
    if (!(control instanceof FormArray)) {
      return null;
    }

    const formArray = control as FormArray;
    const duplicates = new Set();

    // Loop through all the controls inside the FormArray
    for (let i = 0; i < formArray.length; i++) {
      const color = formArray.at(i).get('color')?.value;
      const size = formArray.at(i).get('size')?.value;

      // Check if this combination of color and size already exists in the Set
      const combination = `${color}-${size}`;
      if (duplicates.has(combination)) {
        // If combination exists, set error
        return { duplicate: true };
      }

      // Add the combination to the Set
      duplicates.add(combination);
    }

    return null; // No duplicates found
  };
}

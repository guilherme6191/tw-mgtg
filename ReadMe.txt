**Contents**
-- Instaling
`npm install` to install the dependencies (mocha)

-- To run the application
`npm start` or `node index.js`

-- To run the tests
`npm start`

----------------------------------------------------

**Description**

The input used is the input.txt file, which can be modified in order to test different inputs.
Each line is read separately, the system tells apart what the line means, it can be assigment,
credit, how many or how much question.

The system:
- Is case-insensitive.
- Uses regex to understand words of the line and 'global' arrays to map the meaning of the
words, for example, to set what is the value of a unit or currency.
- Tried to separate each concern for a separate function so they handle only one thing.
- Accepts floating numbers.


**Guilherme R Vasconcelos - gui.vasconcelos.21@gmail.com**




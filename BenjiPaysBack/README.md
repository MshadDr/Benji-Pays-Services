# BenjiPays - Social Network Backend

A robust social networking backend built with NestJS, A sophisticated mortgage calculator application, designed to help users calculate and visualize their mortgage payments with precision and ease.

## 👤 Author

- **Name**: Mehrshad Darvish
- **Email**: mshad.darvish@gmail.com
- **Phone**: +1 (604) 220-2775
- [Linkedin](https://www.linkedin.com/in/mehrshad-darvish/)

## 🎥 Project Overview

Watch the video explanation of this project:
[Video Link](https://youtu.be/h0XOxBXRxrI)

## 🌟 Features

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Testing**: Jest
- **Runtime**: Node.js (LTS)

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone git@github.com:MshadDr/benji-pays.git
cd in the project
```

2. Copy the example environment file:

```bash
cp .env.example .env
```

## Running the Application

### Development Mode

#### Start the application in development mode

```bash
npm i
npm run dev
```

### Postman Collection

- [Postman Collection](postman/)

### APIS

1- `healthCheck`:

- CURL:

```json
  curl --location 'http://localhost:3030/api/health'
```

- RESPONSE Sample:

```json
{
  "statusCode": 200,
  "success": true,
  "message": "health is ok..."
}
```

2- `get down payment amounts`:

- CURL:

```json
   curl --location 'http://localhost:3030/api/v1/mortgage/calculate-down-payment?propertyPrice=600000'
```

- RESPONSE Sample:

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Down payment calculation successful",
  "data": [
    [0.058, 35000],
    [0.1, 60000],
    [0.15, 90000],
    [0.2, 120000]
  ]
}
```

3- `Mortgage Calculation`:

- CURL:

```json
   curl --location 'http://localhost:3030/api/v1/mortgage/calculate-mortgage?propertyPrice=500000&downPayment=25000&annualInterestRate=0.041&amortizationPeriod=25&paymentSchedule=monthly'
```

- RESPONSE Sample:

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Request is successful",
  "data": {
    "amortizationPeriod": 25,
    "paymentSchedule": "monthly",
    "payment": 2635,
    "cmhcInsurance": 19000,
    "insuredMortgageAmount": 494000
  }
}
```

## 🧪 Testing

The project includes comprehensive test suites for services, resolvers, and permission logic:

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Benji Pays team for the amazing opportunity

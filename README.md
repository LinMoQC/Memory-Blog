# ☀️ LinMo Blog

A developing blog framework, based on `React` + `TypeScript` + `SpringBoot`

## 🗺 Roadmap

- [x] Backstage UI
- [x] Frontend UI
- [x] API
- [x] Login System
- [x] Axios Encapsulation

## 👌 Tech Stacks

### Front end

- React + TypeScript
- React Router
- Reducer
- Sass
- Axios
- Vite

### Behind end

- SpringBoot
- Mybatis

## Structure

```text
Blog/
|-- server/
|   |-- db.json      // json-server startup file
|-- src/
|   |-- apis
|   |-- assets
|   |-- components
|   |-- interface
|   |-- pages
|   |-- router
|   |-- store        // Redux States Management
|-- package.json
|-- README.md
```

## Development

```shell
// Prepare source code
git clone https://github.com/LinMoQC/LinMoBlog.git
cd LinMoBlog

// Run front end
npm install # If failed please append `--force`
npm run dev

// Run behind end:
mvn package
java -jar xxx.jar  //target file

account:admin
password:123456

If you want to change the username or password, please generate the SHA256 encrypted ciphertext by yourself temporarily, and then replace it in the user table of the database.
```

## Where You Should Change
 #### server/src/main/resources/application.yml
 ![image](https://github.com/LinMoQC/LinMoBlog/assets/59323207/3eddce3e-dd4b-476e-b1b8-d8cd67ac8324)
 ### server/src/main/java/com/linmoblog/server/Config/ImageConfig.java
 ![image](https://github.com/LinMoQC/LinMoBlog/assets/59323207/8931931f-89ed-4927-94c0-cc499d302a94)

## Which interfaces are not yet completed?
  - Article conditional search
  - Word cloud and hotspot map on the homepage
  - Statistics page
  - Translate the settings page into English

## 😉 Preview

### Login Page
![](./screenshots/login.png)

### Backstage Home Page
![c38005904c9c5be6da96853c0167e40](https://github.com/LinMoQC/LinMoBlog/assets/59323207/ce6a46cb-20c4-4b32-847b-3540b3d3ca5b)

### Dark Mode
![e6741ccfe03917957ac5eaabb45eade](https://github.com/LinMoQC/LinMoBlog/assets/59323207/383f7e2e-0829-45f6-95b8-16dacd96b604)

### Notes
![image](https://github.com/LinMoQC/LinMoBlog/assets/59323207/cdab595f-4a7f-4612-a17b-bd4c889d0725)
![825e53fc859297c29cd0891f50f0164](https://github.com/LinMoQC/LinMoBlog/assets/59323207/578863ed-dcf9-4863-b1d1-25d4f38ea3cb)
![image](https://github.com/LinMoQC/LinMoBlog/assets/59323207/fd2dd783-264f-4d0a-a3f2-a8fd3ca1d706)

![2563eab5a1964e16a0e59f958a7f652](https://github.com/LinMoQC/LinMoBlog/assets/59323207/5ae3a88b-e0fa-435f-af1b-580b2d4141e6)

### TalkTalk
![0e87026ca10e8eea0bccc3eb7bc91e3](https://github.com/LinMoQC/LinMoBlog/assets/59323207/5d9af682-9230-4d66-bb07-00a5963dc96e)

### Gallery
![a258afefc28d0cee24e21b864b7cabb](https://github.com/LinMoQC/LinMoBlog/assets/59323207/ba0f15f7-cb83-4bb9-a25e-09d46960a8c6)

### Friend Links
![ad6eb864bc573c8b9996ddf3ddfe978](https://github.com/LinMoQC/LinMoBlog/assets/59323207/d525fcdd-0bd5-4a3b-9ff9-433e24f414ec)

### Site Analyse
![3f5340f422f1a501cf675c70b401980](https://github.com/LinMoQC/LinMoBlog/assets/59323207/78e6268c-dad3-4404-8c85-b7ff80f1a5db)

### Site Management
![28cca66c9a8b2f08e2ef0eb30e7c147](https://github.com/LinMoQC/LinMoBlog/assets/59323207/7f82153d-0688-4581-9347-f604098df0f8)

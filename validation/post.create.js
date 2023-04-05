import * as yup from "yup"

const postCreateSchema = yup.object().shape({
  title: yup.string().required("Title Harus di isi"),
  body: yup.string().required("Body Harus di isi"),
  userId: yup.string().required("userId Harus di pilih"),
})

export default postCreateSchema

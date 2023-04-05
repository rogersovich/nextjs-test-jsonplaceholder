import { Button } from "@chakra-ui/react"
import { useEffect } from "react"
// component
import ModalDialog from "./modal.dialog"
import CsInput from "./cs.input"
import CsSelect from "./cs.select"
// form
import postUpdateSchema from "../validation/post.update"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
// api
import { getUsers } from "../services/user"
import { updatePosts, getPost } from "../services/post"
import { useQuery, useMutation } from "@tanstack/react-query"

const PostEdit = ({
  isShow,
  toggleShow,
  onUpdateSuccess,
  onUpdateError,
  toggleLoading,
  id,
}) => {
  // init data form
  const initialValues = {
    title: "",
    body: "",
    userId: "",
  }

  // make react hook form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(postUpdateSchema),
  })

  // get users api
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return getUsers({
        _limit: 10,
      })
    },
  })
  // filter response users
  const userOptions = usersQuery.data
    ? usersQuery.data.map((user) => ({ value: user.id, label: user.name }))
    : []

  // get detail post api
  const postQuery = useQuery({
    queryKey: ["post"],
    queryFn: () => {
      return getPost(id)
    },
  })

  useEffect(() => {
    // fill form data
    if (postQuery.data && usersQuery.isSuccess) {
      setValue("title", postQuery.data.title)
      setValue("body", postQuery.data.body)
      setValue("userId", postQuery.data.userId)
    }
  }, [postQuery.data, usersQuery.isSuccess, setValue])

  // update post
  const handleUpdate = useMutation({
    mutationFn: (formData) => {
      toggleShow()
      toggleLoading()
      return updatePosts({id: id, data: formData})
    },
    onSuccess: (data) => {
      onUpdateSuccess(data)
    },
    onError: () => {
      onUpdateError()
    },
  })

  // submit update
  const onSubmit = (data) => {
    handleUpdate.mutate(data)
  }

  return (
    <>
      <ModalDialog
        toggleShow={isShow}
        triggerClose={toggleShow}
        size="lg"
        maxHeight="600"
        isCentered={true}
        closeOnOverlayClick={true}
      >
        <slot name="header">
          <div className="tw-text-gray-600">Edit Post</div>
        </slot>

        <slot name="content">
          <div>
            {postQuery.isLoading || usersQuery.isLoading ? (
              <p>Loading...</p>
            ) : postQuery.isError || usersQuery.isError ? (
              <p>
                Error: {postQuery.error?.message || usersQuery.error?.message}
              </p>
            ) : (
              <>
                <form onSubmit={handleSubmit(onSubmit)} id="my-form">
                  <div className="tw-mb-3">
                    <CsSelect
                      label="User"
                      placeholder="Pilih User"
                      errors={errors.userId}
                      control={control}
                      name={"userId"}
                      options={userOptions}
                    ></CsSelect>
                  </div>
                  <div className="tw-mb-3">
                    <CsInput
                      label="Title"
                      placeholder="Masukan Title"
                      errors={errors.title}
                      register={{ ...register("title") }}
                    />
                  </div>
                  <div className="tw-mb-3">
                    <CsInput
                      label="Body"
                      placeholder="Masukan Body"
                      errors={errors.body}
                      register={{ ...register("body") }}
                    />
                  </div>
                </form>
              </>
            )}
          </div>
        </slot>

        <slot name="footer">
          <Button colorScheme="green" type="submit" form="my-form" px={8}>
            Update
          </Button>
        </slot>
      </ModalDialog>
    </>
  )
}

export default PostEdit

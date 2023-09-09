import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import React, { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const scheme = yup.object({
  fullName: yup.string().min(5).max(20).required(),
  noKaryawan: yup.number().positive().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .max(12)
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*()])(?!.*\s).{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required(),
})

const InputForm = () => {
  const [inputState, setInputState] = useState({})
  const [seePassword, setSeePassword] = useState(false)
  const [pw, setPw] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(scheme),
  })

  const onSubmitHandler = (data) => {
    setInputState(data)
    reset()
  }

  console.log(inputState)

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex aspect-[9/14] w-full max-w-[360px] flex-col items-center space-y-3 rounded-sm border border-gray-400/40 bg-black/30 px-4 py-5"
      >
        <h1 className="w-full p-2 text-center text-2xl font-bold">box Movie</h1>
        <div className="relative flex h-auto w-full flex-col">
          <span className="text-teal-600">
            full name<span className="text-red-600">*</span>
          </span>
          <input
            type="text"
            {...register("fullName", { required: true })}
            className="h-10 w-full rounded-sm border border-gray-400/40 bg-transparent px-3 py-2 focus:border-teal-600"
            placeholder="full name..."
            spellCheck="false"
          />
          <p className="text-xs font-thin text-red-600">
            {errors.fullName?.message}
          </p>
        </div>

        <div className="relative flex h-auto w-full flex-col">
          <span className="text-teal-600">
            no karyawan<span className="text-red-600">*</span>
          </span>
          <input
            {...register("noKaryawan", { required: true })}
            className="h-10 w-full rounded-sm border border-gray-400/40 bg-transparent px-3 py-2 focus:border-teal-600"
            placeholder="no karyawan..."
          />
          <p className="text-xs font-thin text-red-600">
            {errors.noKaryawan && "must be number"}
          </p>
        </div>

        <div className="relative flex h-auto w-full flex-col">
          <span className="text-teal-600">
            Email<span className="text-red-600">*</span>
          </span>
          <input
            type="email"
            {...register("email", { required: true })}
            className="h-10 w-full rounded-sm border border-gray-400/40 bg-transparent px-3 py-2 focus:border-teal-600"
            placeholder="email..."
          />
          <p className="text-xs font-thin text-red-600">
            {errors.email?.message}
          </p>
        </div>

        <div className="relative flex h-auto w-full flex-col">
          <span className="text-teal-600">
            password<span className="text-red-600">*</span>
          </span>
          <div className="relative h-10 w-full">
            <input
              {...register("password", { required: true })}
              className="h-full w-full rounded-sm border border-gray-400/40 bg-transparent px-3 py-2 focus:border-teal-600"
              placeholder="password..."
              type={pw ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() => setPw(!pw)}
              className="absolute bottom-2.5 right-3"
            >
              {pw ? (
                <AiOutlineEye className=" h-5 w-5 text-white" />
              ) : (
                <AiOutlineEyeInvisible className=" h-5 w-5 text-white" />
              )}
            </button>
          </div>

          <p className="text-xs font-thin text-red-600">
            {errors.password?.message}
          </p>
        </div>

        <div className="relative flex h-auto w-full flex-col">
          <span className="text-teal-600">
            confirm Password<span className="text-red-600">*</span>
          </span>
          <div className="relative h-10 w-full">
            <input
              {...register("confirmPassword", { required: true })}
              className="h-full w-full rounded-sm border border-gray-400/40 bg-transparent px-3 py-2 focus:border-teal-600"
              placeholder="confirm password..."
              type={seePassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() => setSeePassword(!seePassword)}
              className="absolute bottom-2.5 right-3"
            >
              {seePassword ? (
                <AiOutlineEye className=" h-5 w-5 text-white" />
              ) : (
                <AiOutlineEyeInvisible className=" h-5 w-5 text-white" />
              )}
            </button>
          </div>

          <p className="text-xs font-thin text-red-600">
            {errors.confirmPassword && "password does not match"}
          </p>
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded-sm bg-teal-600 text-xl font-semibold text-white"
        >
          submit
        </button>
      </form>
      {/* output */}
      <div className="ml-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-3xl font-bold capitalize text-transparent">
        <span className="text-white">welcome : </span>
        {inputState.fullName}✨
      </div>
    </>
  )
}

export default InputForm

export const Input = () => {
  return (
    <div className="relative flex h-auto w-full flex-col">
      <span className="text-teal-600">
        full name<span className="text-red-600">*</span>
      </span>
      <input
        type="text"
        {...register("fullName")}
        className="h-10 w-full rounded-sm border border-gray-400/40 bg-transparent px-3 py-2 focus:border-teal-600"
        placeholder="full name..."
        spellCheck="false"
      />
      <p className="absolute bottom-0 text-xs font-thin text-red-600">
        {errors.fullName?.message}
      </p>
    </div>
  )
}

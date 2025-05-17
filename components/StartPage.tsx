import { Button } from "./ui/button";

export default function Header() {
  return (
    <>
      <header className="dark:bg-secondaryBlack inset-0 flex min-h-[100vh] w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
        <div className="mx-auto w-container max-w-full px-5 py-[110px] text-center lg:py-[150px]">
          <h1 className="text-3xl font-heading md:text-4xl lg:text-5xl">
            ASCO Your AI powered Solution for Carbon Control
          </h1>
          <p className="my-12 mt-8 text-lg font-normal leading-relaxed md:text-xl lg:text-2xl lg:leading-relaxed">
            Get started with Improvments made for your personal environment and
            get recongnition.
            <br /> Check the{" "}
            <a
              target="_blank"
              href="https://github.com/alihamza1221/asco.git"
              className="font-heading underline"
            >
              github repo
            </a>{" "}
            for more info.
          </p>
          <a href="/auth/sign-in">
            <Button
              size="lg"
              className="h-12 mr-3 text-base font-heading md:text-lg  "
            >
              Sign Up
            </Button>
          </a>
          <a href="/home">
            <Button
              size="lg"
              className="h-12 text-base font-heading md:text-lg "
            >
              Get started
            </Button>
          </a>
        </div>
      </header>
    </>
  );
}

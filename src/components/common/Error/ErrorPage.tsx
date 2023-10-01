import { component$, useStyles$, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import ErrorPageStyle from "./ErrorPage.css?inline";
const buttonStyle = {
  color: "#fff",
  padding: "10px 20px",
  background: "#39ac31",
  margin: "20px 0",
  display: "inline-block",
};
export const ErrorPage = component$(() => {
  useStyles$(ErrorPageStyle);
  return (
    <section class="page_404">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div class="four_zero_four_bg">
                <h1 class="text-center ">404</h1>
              </div>

              <div class="contant_box_404">
                <h3 class="h3">"An unexpected error has been occured!"</h3>

                <Link href="/">
                  <button class="link-404" style={buttonStyle}>
                    Go to Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

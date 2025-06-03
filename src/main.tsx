import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Routedata } from "./Route/routingdata.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import RootWrapper from "./pages/Rootwrapper.tsx";
import Loader from "./components/loader/loader.tsx";
const App = lazy(() => import("./pages/App.tsx"));
const ComingSoon = lazy(
  () => import("./container/authentication/coming-soon/coming-soon.tsx")
);
const CreateBasic = lazy(
  () =>
    import(
      "./container/authentication/create-password/create-basic/create-basic.tsx"
    )
);
const Createcover = lazy(
  () =>
    import(
      "./container/authentication/create-password/create-cover/create-cover.tsx"
    )
);
const Screenbasic = lazy(
  () =>
    import("./container/authentication/lock-screen/lock-basic/lock-basic.tsx")
);
const Screencover = lazy(
  () =>
    import("./container/authentication/lock-screen/lock-cover/lock-cover.tsx")
);
const Resetbasic = lazy(
  () =>
    import(
      "./container/authentication/reset-password/reset-basic/reset-basic.tsx"
    )
);
const Resetcover = lazy(
  () =>
    import(
      "./container/authentication/reset-password/reset-cover/reset-cover.tsx"
    )
);
const Signupbasic = lazy(
  () =>
    import("./container/authentication/sign-up/sign-up-basic/signup-basic.tsx")
);
const Signupcover = lazy(
  () =>
    import("./container/authentication/sign-up/sign-up-cover/signup-cover.tsx")
);
const Signinbasic = lazy(
  () =>
    import("./container/authentication/sign-in/sign-in-basic/signin-basic.tsx")
);
const Signincover = lazy(
  () =>
    import("./container/authentication/sign-in/sign-in-cover/signin-cover.tsx")
);
const Twobasic = lazy(
  () =>
    import(
      "./container/authentication/two-step-verification/twostep-basic/twostep-basic.tsx"
    )
);
const Twocover = lazy(
  () =>
    import(
      "./container/authentication/two-step-verification/twostep-cover/twostep-cover.tsx"
    )
);
const Undermaintanance = lazy(
  () =>
    import(
      "./container/authentication/under-maintainance/under-maintainance.tsx"
    )
);
const Error401 = lazy(
  () => import("./container/authentication/error/401-error/error401.tsx")
);
const Error404 = lazy(
  () => import("./container/authentication/error/404-error/error404.tsx")
);
const Error500 = lazy(
  () => import("./container/authentication/error/500-error/error-500.tsx")
);
const AuthenticationLayout = lazy(
  () => import("./pages/authenticationlayout.tsx")
);
const Landinglayout = lazy(() => import("./pages/landinglayout.tsx"));
const Login = lazy(() => import("./authentication/login/index.tsx"));
const Auth = lazy(() => import("./authentication/auth.tsx"));
const Signup = lazy(() => import("./authentication/signup.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RootWrapper>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path={`${import.meta.env.BASE_URL}`} element={<Auth />}>
                <Route index element={<Login />} />
                <Route
                  path={`${import.meta.env.BASE_URL}authentication/login`}
                  element={<Login />}
                />
                <Route
                  path={`${import.meta.env.BASE_URL}authentication/signup`}
                  element={<Signup />}
                />
              </Route>
              <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
                {Routedata.map((idx) => (
                  <Route key={idx.id} path={idx.path} element={idx.element} />
                ))}
              </Route>

              <Route
                path={`${import.meta.env.BASE_URL}`}
                element={<AuthenticationLayout />}
              >
                <Route
                  path={`${import.meta.env.BASE_URL}authentication/coming-soon`}
                  element={<ComingSoon />}
                />
                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/create-password/create-basic`}
                  element={<CreateBasic />}
                />
                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/create-password/create-cover`}
                  element={<Createcover />}
                />

                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/lock-screen/lock-basic`}
                  element={<Screenbasic />}
                />
                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/lock-screen/lock-cover`}
                  element={<Screencover />}
                />

                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/reset-password/reset-basic`}
                  element={<Resetbasic />}
                />
                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/reset-password/reset-cover`}
                  element={<Resetcover />}
                />

                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/sign-up/sign-up-basic`}
                  element={<Signupbasic />}
                />
                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/sign-up/sign-up-cover`}
                  element={<Signupcover />}
                />

                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/sign-in/sign-in-basic`}
                  element={<Signinbasic />}
                />
                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/sign-in/sign-in-cover`}
                  element={<Signincover />}
                />

                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/two-step-verification/twostep-basic`}
                  element={<Twobasic />}
                />
                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/two-step-verification/twostep-cover`}
                  element={<Twocover />}
                />

                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/under-maintainance`}
                  element={<Undermaintanance />}
                />

                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/error/401-error`}
                  element={<Error401 />}
                />
                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/error/404-error`}
                  element={<Error404 />}
                />
                <Route
                  path={`${
                    import.meta.env.BASE_URL
                  }authentication/error/500-error`}
                  element={<Error500 />}
                />
              </Route>
              <Route
                path={`${import.meta.env.BASE_URL}`}
                element={<Landinglayout />}
              >
                <Route
                  path={`${import.meta.env.BASE_URL}pages/landing`}
                />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </RootWrapper>
    </Provider>
  </StrictMode>
);

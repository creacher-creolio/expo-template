# React Native w/Expo Project Template

## Create a new Project in Expo + Github

1. <https://expo.dev/onboarding/hello>: follow the onboarding steps
2. Cancel the npm install
3. run pnpm install
4. commit
5. reset project, using the command in package.json
6. copy over template files, except:
  · files that are gitignored in the new project
  · the 'app' folder
  · components/(auth)
  · components/(common)
  · components/profile
  · components/supabase
  · hooks
  · lib/contexts
  · lib/state
  · lib/types
  · lib/validation
  · docs/project-specific

7. other project tweaks
· delete eslint.config.js
· update the mcp server file

8. setup supabase
· setup the project
· update env.local
· download types

## Initial Install & Setup

1. From terminal in the directory the project will be located in
    - pnpm dlx create-expo-app@latest
      --template [template-name]
      --t default
      --example [example-name]
      --help
      --<https://docs.expo.dev/more/create-expo/#options>
2. git branch -m master main
3. pnpm dlx expo start
   --clear
   --help

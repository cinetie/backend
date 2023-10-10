#!/usr/bin/python
class SplitEnv:
    """
    This utility is used to split the main .env file into 2 sections based on different environments
    """

    def __init__(self) -> None:
        self.env_lines = []
        self.prod_lines = []
        self.staging_lines = []
        self.dev_lines = []
        self.all_lines = []
        self.test_lines = []

    def read_lines(self):
        """
        This function reads lines off of .env file
        """
        with open(".env", encoding="UTF-8") as f:
            self.env_lines = f.readlines()

    def split_lines(self):
        """
        This function splits an individual lines into 2 environments
        """
        self.prod_lines = filter(
            lambda _line: ("PRODUCTION" in _line) or ("PROD" in _line), self.env_lines
        )
        self.staging_lines = filter(lambda _line: ("STAGING" in _line), self.env_lines)
        self.dev_lines = filter(
            lambda _line: "DEVELOPMENT" in _line or "DEV" in _line, self.env_lines
        )
        self.test_lines = filter(
            lambda _line: "TEST" in _line, self.env_lines
        )
        self.all_lines = list(filter(
            lambda _line: (("PRODUCTION" not in _line) and ("PROD" not in _line))
            and ("STAGING" not in _line)
            and (("DEVELOPMENT" not in _line) and ("DEV" not in _line)), self.env_lines
        ))

        with open(".env.production", "+wt", encoding='utf-8') as f_prod:
            for line in self.prod_lines:
                f_prod.write(line)
                f_prod.write("NODE_ENV=production\n")

            for line in self.all_lines:
                f_prod.write(line)

        with open(".env.staging", "+wt", encoding='utf-8') as f_staging:
            for line in self.staging_lines:
                f_staging.write(line)
                f_staging.write("NODE_ENV=staging\n")

            for line in self.all_lines:
                f_staging.write(line)

        with open(".env.dev", "+wt", encoding='utf-8') as f_dev:
            for line in self.dev_lines:
                f_dev.write(line)
                f_dev.write("NODE_ENV=dev\n")

            for line in self.all_lines:
                f_dev.write(line)

        with open("../.env.test", "+wt", encoding='utf-8') as f_test:
            for line in self.test_lines:
                f_test.write(line)
                f_test.write("NODE_ENV=test\n")

            for line in self.all_lines:
                f_test.write(line)


if __name__ == "__main__":
    split_env = SplitEnv()
    split_env.read_lines()
    split_env.split_lines()

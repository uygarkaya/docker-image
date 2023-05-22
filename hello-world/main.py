class HelloWorld:
    def __init__(self) -> None:
        self.hello_world()

    def hello_world(self):
        print('Hello from Custom Docker Image!')
        print('This message shows that your custom docker image appears to be working correctly.')

if __name__ == '__main__':
    HelloWorld()
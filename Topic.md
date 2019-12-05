TCP

传输层

提供应用程序间的通信。其功能包括：一、格式化信息流；二、提供可靠传输。为实现后者，传输层协议规定接收端必须发回确认，并且假如分组丢失，必须重新发送。



什么是TCP

TCP：传输控制协议，应用程序之间通信，传输层



TCP使用固定的连接，三次握手之后，建立一个全双工的通信，在四次挥手之后，关闭连接。

TCP 负责在数据传送之前将它们分割为 IP 包，然后在它们到达的时候将它们重组。



#### 三次握手

![image-20190801233454076](/Users/user/Library/Application Support/typora-user-images/image-20190801233454076.png)

三次握手就是建立TCP连接的过程

第一次握手：客户端将标志位SYN设为1，随机产生一个seq序号=J，发送给服务端，客户端进入**SYN_SENT**状态，等待服务端确认

第二次握手，服务端接收到数据包后由标志位SYN=1得知某客户端需要建立连接，服务端将标志位SYN和ACK都设为1，ack=J+1，随机产生一个seq序号=K，并将该数据包发送给客户端以确认连接，此时服务端进入**SYN_RCVD**状态

第三次握手，客户端收到确认数据包，检查ack是否为J+1，ACK是否为1，如果正确则将标志位ACK设为1，ack=K+1，并将该数据包发送给服务端，服务端检查ack是否为K+1，ACK是否为1，如果正确则连接建立成功，客户端和服务端进入**ESTABLISHED**状态，完成三次握手，客户端和服务端之间可以开始传输数据了。

#### 四次挥手

![image-20190801233505705](/Users/user/Library/Application Support/typora-user-images/image-20190801233505705.png)

由于TCP连接时是全双工的，因此，每个方向都必须要单独进行关闭。

第一次挥手：Client发送一个FIN，用来关闭Client到Server的数据传送，Client进入**FIN_WAIT_1**状态

第二次挥手：Server收到FIN信号后，发一个ACK给Client，确认序号为收到序号+1，Server 进入CLOSE_WAIT状态

第三次挥手：Server发送一个FIN，用来关闭Server到Client的数据传送，Server进入LAST_ACK状态

第四次挥手：Client收到FIN后，Client进入TIME_WAIT状态，接着发送一个ACK给Server，确认序号为收到序号+1，Server进入CLOSED状态，完成四次挥手

#### TCP报文格式

![image-20190801233528507](/Users/user/Library/Application Support/typora-user-images/image-20190801233528507.png)






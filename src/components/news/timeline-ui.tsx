import { Timeline } from "@/components/ui/timeline";
import { XCard } from "@/components/ui/x-gradient-card";
import { MomentCard } from "./moment-card";
import { useTranslation } from "react-i18next";
import { EllipsisText } from "./ellipsis-text";
import Zmage from "../ui/zoom-image"; 

export function TimelineUI() {

  const { t } = useTranslation("news");

  const releasepaper = {
    authorName: "PHYBench",
    authorHandle: "phybench-official",
    icon: "arxiv",
    iconlink: "https://arxiv.org/abs/2504.16074",
    authorImage:
      "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
    content: (
      <>
        <EllipsisText 
          text={t("post.releasepaper")}
          className=" whitespace-pre-line mb-4"
        />
        <a 
          href="https://arxiv.org/abs/2504.16074"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-800 dark:text-sky-200 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors ">
          https://arxiv.org/abs/2504.16074
        </a>
        <Zmage
          src="https://s2.loli.net/2025/05/13/QilrptAXTNo4uhY.png"
          alt="phybench on arxiv"
          className="mt-4 rounded-lg"
        />
      </>
    ),
    isVerified: true,
    timestamp: "Apr 22, 2025",
  }

  const machineheart = {
    authorName: "机器之心",
    authorHandle: "机器之心",
    icon: "wechat",
    iconlink: "https://mp.weixin.qq.com/s/IghOxL81N0AnP2UOIjTCZA",
    authorImage:
      "https://s2.loli.net/2025/05/12/Y78auvHQBt6xVq9.png",
    content: (
      <>
        <p>发布了新公众号文章：</p>
        <MomentCard
          link="https://mp.weixin.qq.com/s/IghOxL81N0AnP2UOIjTCZA"
          title="北大物院200人合作，金牌得主超50人！PHYBench：大模型究竟能不能真的懂物理？"
          viewCount="22k"
          likeCount="300+"
        />
      </>
    ),
    isVerified: true,
    timestamp: "Apr 28, 2025",
    reply: {
      authorName: "PHYBench",
      authorImage:
        "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
      content: "Awesome.",
      isVerified: true,
      timestamp: "May 1",
    },
  };

  const newzhiyuan = {
    authorName: "新智元",
    authorHandle: "新智元",
    icon: "wechat",
    iconlink: "https://mp.weixin.qq.com/s/yAbEp0sThS6Dpay0gTlhNQ",
    authorImage:
      "https://s2.loli.net/2025/05/12/qDIFeHP2si1TaZW.png",
    content: (
      <>
        <p>发布了新公众号文章：</p>
        <MomentCard
          link="https://mp.weixin.qq.com/s/yAbEp0sThS6Dpay0gTlhNQ"
          title="北大出手，物理学院天才们教AI「做人」！PHYBench成大模型物理能力试金石"
          viewCount="6k"
          likeCount="100+"
        />
      </>
    ),
    isVerified: true,
    timestamp: "May 1, 2025",
  }

  const hfrank = {
    authorName: "PHYBench",
    authorHandle: "phybench-official",
    icon: "huggingface",
    iconlink: "https://huggingface.co/datasets/Eureka-Lab/PHYBench",
    authorImage:
      "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
    content: (
      <>
        <EllipsisText 
          text={t("post.hfrank")}
          className=" whitespace-pre-line mb-4"
        />
        <a 
          href="https://huggingface.co/datasets/Eureka-Lab/PHYBench"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-800 dark:text-sky-200 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors ">
          https://huggingface.co/datasets/Eureka-Lab/PHYBench
        </a>
        <Zmage
          src="https://s2.loli.net/2025/05/13/pd9wUzfIvYb6Ve4.jpg"
          alt="phybench on alphaxiv"
          className="mt-4 rounded-lg"
        />
      </>
    ),
    isVerified: true,
    timestamp: "May 1, 2025",
  }

  const alphaxiv1 = {
    authorName: "alphaXiv",
    authorHandle: "askalphaxiv",
    authorImage:
      "https://s2.loli.net/2025/05/12/76N4vCnVw5rYLkf.png",
    iconlink: "https://x.com/askalphaxiv/status/1915414425533907021",
    content: (
      <>
        <EllipsisText 
          text={t("post.alphaxiv1")}
          className=" whitespace-pre-line"
        />
        <Zmage
          src="https://s2.loli.net/2025/05/12/wdYoDfuUvkPJNzQ.png"
          alt="phybench on alphaxiv"
          className="mt-4 rounded-lg"
        />
      </>
    ),
    isVerified: true,
    timestamp: "Apr 24, 2025",
  }

  const alphaxiv2 = {
    authorName: "alphaXiv",
    authorHandle: "askalphaxiv",
    authorImage:
      "https://s2.loli.net/2025/05/12/76N4vCnVw5rYLkf.png",
    iconlink: "https://x.com/askalphaxiv/status/1916168237231837190",
    content: (
      <>
        <EllipsisText 
          text={t("post.alphaxiv2")}
          className=" whitespace-pre-line"
        />
        <Zmage
          src="https://s2.loli.net/2025/05/12/VtZnYDGzIMcWToA.png"
          alt="phybench on alphaxiv"
          className="mt-4 rounded-lg"
        />
      </>
    ),
    isVerified: true,
    timestamp: "Apr 27, 2025",
  }

  const releaseGrok4 = {
    authorName: "PHYBench",
    authorHandle: "phybench-official",
    authorImage:
      "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
    content: (
      <>
        <EllipsisText 
          text={t("post.grok4")}
          className=" whitespace-pre-line mb-4"
        />
      </>
    ),
    isVerified: true,
    timestamp: "Jul 12, 2025",
  }

  const qwen3release = {
    authorName: "PHYBench",
    authorHandle: "phybench-official",
    // icon: "huggingface",
    authorImage:
      "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
    content: (
      <>
        <EllipsisText 
          text={t("post.qwen3release")}
          className=" whitespace-pre-line mb-4"
        />
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-2 flex flex-col w-full lg:pb-4">
          <Zmage
            src="https://s2.loli.net/2025/05/19/JLZVuXsTy5IERnA.png"
            alt="qwen3 release"
            className="mt-4 rounded-lg w-full lg:w-fit lg:h-full object-cover"
          />
          <Zmage
            src="https://s2.loli.net/2025/05/19/1AmhWLGXug9xJIn.png"
            alt="qwen3 release"
            className="mt-4 rounded-lg w-full lg:w-fit lg:h-full object-cover"
          />
        </div>
      </>
    ),
    isVerified: true,
    timestamp: "May 10, 2025",
  }

  const versionUpdate = {
    authorName: "PHYBench",
    authorHandle: "phybench-official",
    icon: "huggingface",
    iconlink: "https://huggingface.co/blog/StarThomas1002/arxiv-2504-16074",
    authorImage:
      "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
    content: (
      <>
        <EllipsisText
          text={t("post.versionUpdate")}
          className=" whitespace-pre-line mb-4" 
        />
        <a
          href="https://huggingface.co/blog/StarThomas1002/arxiv-2504-16074"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-800 dark:text-sky-200 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors mb-4 block">
          https://huggingface.co/blog/StarThomas1002/arxiv-2504-16074
        </a>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Zmage
            src="https://pic1.imgdb.cn/item/682f0f0d58cb8da5c806cf65.png"
            alt="version update image 1"
            className="rounded-lg w-full h-32 lg:h-48 object-cover"
          />
          <Zmage
            src="https://pic1.imgdb.cn/item/68271b5658cb8da5c8f7006c.jpg"
            alt="version update image 2"
            className="rounded-lg w-full h-32 lg:h-48 object-cover"
          />
          <Zmage
            src="https://pic1.imgdb.cn/item/68271b7c58cb8da5c8f7031e.jpg"
            alt="version update image 3"
            className="rounded-lg w-full h-32 lg:h-48 object-cover"
          />
          <Zmage
            src="https://pic1.imgdb.cn/item/68271b9458cb8da5c8f704d8.jpg"
            alt="version update image 4"
            className="rounded-lg w-full h-32 lg:h-48 object-cover"
          />
        </div>
      </>
    ),
    isVerified: true,
    timestamp: "May 25, 2025",
  }

  const data = [
    {
      title: "2025-07-12",
      content: <XCard {...releaseGrok4} />,
    },
    {
      title: "2025-05-25",
      content: <XCard {...versionUpdate} />,
    },
    {
      title: "2025-05-10",
      content: <XCard {...qwen3release} />,
    },
    {
      title: "2025-05-01",
      content: (
        <>
          <XCard {...hfrank} />
          <XCard {...newzhiyuan} />
        </>
      ),
    },
    {
      title: "2025-04-28",
      content: <XCard {...machineheart} />,
    },
    {
      title: "2025-04-27",
      content: <XCard {...alphaxiv2} />
    },
    {
      title: "2025-04-24",
      content: <XCard {...alphaxiv1} />
    },
    {
      title: "2025-04-22",
      content: <XCard {...releasepaper} />
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}

import { getCollection, type CollectionEntry } from 'astro:content';

export type Lesson = CollectionEntry<'lessons'>;

export interface ModuleInfo {
  slug: string;
  title_hi: string;
  title_en: string;
  lessons: Lesson[];
}

export interface StageInfo {
  id: 'foundation' | 'intermediate';
  title_hi: string;
  title_en: string;
  description_hi: string;
  modules: ModuleInfo[];
}

const STAGE_META: Record<string, { title_hi: string; title_en: string; description_hi: string }> = {
  foundation: {
    title_hi: 'आधार',
    title_en: 'Foundation',
    description_hi: 'वर्णमाला, शब्द रूप, धातु रूप, सन्धि — संस्कृत की नींव',
  },
  intermediate: {
    title_hi: 'मध्यम',
    title_en: 'Intermediate',
    description_hi: 'उन्नत सन्धि, समास, कृदन्त — गहन व्याकरण',
  },
};

export async function getAllLessons(): Promise<Lesson[]> {
  const lessons = await getCollection('lessons');
  return lessons.sort((a, b) => a.data.sort_order - b.data.sort_order);
}

export async function getLessonsByStage(stage: string): Promise<Lesson[]> {
  const lessons = await getAllLessons();
  return lessons.filter((l) => l.data.stage === stage);
}

export async function getModulesForStage(stage: string): Promise<ModuleInfo[]> {
  const lessons = await getLessonsByStage(stage);
  const moduleMap = new Map<string, ModuleInfo>();

  for (const lesson of lessons) {
    const slug = lesson.data.module_slug;
    if (!moduleMap.has(slug)) {
      moduleMap.set(slug, {
        slug,
        title_hi: lesson.data.module_title_hi,
        title_en: lesson.data.module_title_en,
        lessons: [],
      });
    }
    moduleMap.get(slug)!.lessons.push(lesson);
  }

  return Array.from(moduleMap.values());
}

export async function getStagesWithModules(): Promise<StageInfo[]> {
  const stages: StageInfo[] = [];

  for (const stageId of ['foundation', 'intermediate'] as const) {
    const modules = await getModulesForStage(stageId);
    if (modules.length === 0) continue;
    const meta = STAGE_META[stageId];
    stages.push({
      id: stageId,
      ...meta,
      modules,
    });
  }

  return stages;
}

export async function getPrevNextLesson(currentId: string): Promise<{ prev: Lesson | null; next: Lesson | null }> {
  const all = await getAllLessons();
  const idx = all.findIndex((l) => l.id === currentId);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

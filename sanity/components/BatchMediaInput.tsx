import { useCallback, useRef, useState } from "react";
import { Button, Stack, Text } from "@sanity/ui";
import {
  insert,
  setIfMissing,
  useClient,
  type ArrayOfObjectsInputProps,
} from "sanity";

const BATCH_SIZE = 5;

function uniqueKey() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

/**
 * Batch uploader for mixed-media arrays (images, GIFs, videos).
 *
 * Renders the default array input, plus a button that opens a multi-select
 * file picker. Files are uploaded in batches of BATCH_SIZE to stay under the
 * Sanity asset API rate limit, then appended to the array. The asset type is
 * chosen per file from its MIME type: videos become `file` items, everything
 * else (incl. GIFs) becomes `image` items.
 */
export function BatchMediaInput(props: ArrayOfObjectsInputProps) {
  const { onChange } = props;
  const client = useClient({ apiVersion: "2024-01-01" });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const files = Array.from(fileList);
      setError(null);
      setProgress({ done: 0, total: files.length });
      onChange(setIfMissing([]));

      try {
        for (let i = 0; i < files.length; i += BATCH_SIZE) {
          const slice = files.slice(i, i + BATCH_SIZE);
          const items = await Promise.all(
            slice.map(async (file) => {
              const isVideo = file.type.startsWith("video/");
              const asset = await client.assets.upload(
                isVideo ? "file" : "image",
                file,
                { filename: file.name }
              );
              return {
                _type: isVideo ? "file" : "image",
                _key: uniqueKey(),
                asset: { _type: "reference", _ref: asset._id },
              };
            })
          );
          onChange(insert(items, "after", [-1]));
          setProgress({ done: Math.min(i + BATCH_SIZE, files.length), total: files.length });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setProgress(null);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [client, onChange]
  );

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*,.tif,.tiff,.gif"
        style={{ display: "none" }}
        onChange={(e) => handleFiles(e.currentTarget.files)}
      />
      <Button
        mode="ghost"
        text={progress ? `Uploading ${progress.done} / ${progress.total}…` : "Upload files (batch)"}
        disabled={!!progress}
        onClick={() => inputRef.current?.click()}
      />
      {error && (
        <Text size={1} style={{ color: "var(--card-badge-critical-fg-color, red)" }}>
          {error}
        </Text>
      )}
    </Stack>
  );
}

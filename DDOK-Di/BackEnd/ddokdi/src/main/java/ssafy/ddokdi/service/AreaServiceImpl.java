package ssafy.ddokdi.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.ddokdi.entity.Area;
import ssafy.ddokdi.repository.AreaRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class AreaServiceImpl implements AreaService{
    @Autowired
    private AreaRepository areaRepository;

    @Override
    @Transactional
    public List<String> getZoneAll() {
        List<Area> areas = areaRepository.findAll(Sort.by(Sort.Direction.ASC, "zone"));
        List<String> zones = new ArrayList<>();
        for(Area area : areas){
            zones.add(area.getZone());
        }
        return zones;
    }

    @Override
    @Transactional
    public void addZone(String zone) {

            Area area = Area.builder()
                    .zone(zone)
                    .build();
            areaRepository.save(area);

    }

    @Override
    @Transactional
    public Map<String,String> delZone(String zone) {
        Map<String,String> map = new HashMap<>();
        try {
            areaRepository.deleteById(zone);
        }catch (Exception e){
            map.put("CODE", "NOT_FOUND");
            map.put("DETAILS","Non-existent zone");
            return map;
        }
        map.put("CODE", "OK");
        map.put("DETAILS","zone  : "+ zone);
        return map;

    }

    @Override
    @Transactional
    public void delZoneAll() {
        areaRepository.deleteAll();

    }
}
